import { HourglassFullSharp } from '@material-ui/icons'
import Popup from '../../PopUp/Popup.js'
import React from 'react'
import add from '../../../imagenes/add.png'
import okey from '../../../imagenes/okey.png'
import { Redirect } from 'react-router';
import axios from 'axios';
import PasswordStrengthMeter from '../../SeguridadContrasenya/PasswordStrengthMeter';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import emailjs from 'emailjs-com';

const validate = values =>{
  const errors = {}
  console.log(values.passwdCorrecta);
  if (!values.code || values.code != values.codigop2p){
    errors.code = 'Codigo incorrecto'
  }
  if(!values.passwdCorrecta){
    errors.passwdCorrecta = 'Contraseña incorrecta'
  }
  
  return errors

}
const validateContra = values =>{
  const errorsC = {}
  if (!values.contrasenya){
    errorsC.contrasenya = 'Ingrese una contraseña válida'
    console.log("1");
  }
  if (!values.contrasenya_verif){
    console.log("2");
    errorsC.contrasenya_verif = 'Ingrese una contraseña'
  }
  if(values.contrasenya_verif != values.contrasenya ){
    errorsC.coinciden = 'Contraseñas no coinciden'
  
  }
 
  
  return errorsC
}

const contact = { emailDestination:'', code:''};

class CuerpoAdministracion extends React.Component {

  constructor(props){
    super(props)
    this.state={
      showPopup1:false,
      showPopup2:false,
      showPopup3:false,
      okey:false,
      contrasenya:'',
      contrasenya_verif:'',
      errors: {},
      errorsC:{},
      code:'',
      coinciden:'',
      confirmado:false,
      eliminada:false,
      redireccion:false,
      ambasOpciones:false,
      avanzado:false,
      password:'',
      copied1:false,
      copied2:false,
      contrasenya_avanzado:'',
      longitud:'8',
      tipo:'',
      passwdCorrecta:false,
      codigop2p:'',
      send:true,
      
    };
   
  }
  generarContrasenyaDebil =e =>{
    this.setState({tipo:"debil"});

  }
  generarContrasenyaMedia =e =>{
    this.setState({tipo:"media"});

  }
  generarContrasenyaFuerte =e =>{
    this.setState({tipo:"fuerte"});

  }
  comprobarPasswd = (e) => {
      
    if ((this.state.password == '' && this.state.contrasenya_avanzado == '') || (this.state.password != '' && this.state.contrasenya_avanzado != '')){
      this.setState({ambasOpciones:true});
    }else{
     
      if (this.state.password != ''){
        this.setState({contrasenya:this.state.password,contrasenya_verif:this.state.password});
      }else{
        this.setState({contrasenya:this.state.contrasenya_avanzado,contrasenya_verif:this.state.contrasenya_avanzado});
      }
      this.setState({ambasOpciones:false,avanzado:true, showPopup4: !this.state.showPopup4,
        password:'',
        copied1:false,
        copied2:false,
        contrasenya_avanzado:'',
        longitud:'8',
        tipo:'',});
     
    }
  }
  
  validarPassword =(value) =>{
      let val1 = false,
          val2=false,
          val3=false;
      for(let i = 0; i < value.length; i++) {
        if(/[0-9]/.test(value.charAt(i))){
          val1=true;
        }
        if(/[a-zA-Z]/.test(value.charAt(i))){
          val2=true;
        }
        if (this.state.tipo == "fuerte"){
          if((/[!@#$%*]/.test(value.charAt(i)))){
            val3=true;
          }
        }else{
          val3=true;
        }
      }
      return val1 && val2 && val3;
  }

  buildPassword = () => {
    let a = "",
        d = "",
        b = "1234567890abcdefghijklmnopqrstuvwxyz!@#$%*",
        c = this.state.longitud,
        valida = false;


    if(this.state.tipo != ''){
      while(!valida){
        for(let ma = 0; ma < c; ma++) {
          let n = 0;
          if (this.state.tipo == "debil"){
            n = Math.floor(Math.random() * 10);
          }else if (this.state.tipo == "media"){
            n = Math.floor(Math.random() * b.length-6);
          }else{
            n = Math.floor(Math.random() * b.length);
          }
          d = b.charAt(n);
          a = a + d;
        }
        if(this.state.tipo == "media" || this.state.tipo == "fuerte"){
          valida=this.validarPassword(a);
          if (!valida){
            a="";
          }
          
        }else{
          valida = true;
        }
      }
      this.setState({contrasenya_avanzado:a});
    }
  }

  setLongitud = ({ value }) => {
    this.setState({longitud:value}, () => { this.buildPassword();});
   
  }
  mensaje(){
    
    return <span style={{color: 'red'}}>Copiado</span>
    
  }
  eliminarCuenta=async(value)=>{
  
    await axios.delete('https://fresh-techh.herokuapp.com/removeAccount',
    
      {headers: {'Authorization':`Bearer ${value}`}},
    )
    .then(response =>{
      console.log(response.data);
      
    })
    .catch(error=>{
      console.log(error.response.data);
     
    })
  }
  actualizarContrasenya=async(value)=>{
    console.log("ENTRAAA");
    const datos = {password:this.state.contrasenya};
    const headers = {'Authorization':`Bearer ${value}`};
    await axios.post('https://fresh-techh.herokuapp.com/changepw',datos,{headers}
    )
    .then(response =>{
      console.log(response.data);
      localStorage.setItem('contrasenyaActual', this.state.contrasenya);
    })
    
  
  }
  togglePopup1() {
    this.setState({
      showPopup1: !this.state.showPopup1,
      confirmado:false,
      avanzado:false,
      password:'',
      copied1:false,
      copied2:false,
      contrasenya_avanzado:'',
      longitud:'8',
      tipo:'',
      contrasenya:'',
      okey:false,
      send:!this.state.send,
      
    });
    if(this.state.send){
      this.enviarMail();
    }
    
  }
  togglePopup2() {
    this.setState({
      showPopup2: !this.state.showPopup2,
      confirmado:false,
      okey:false,
      send:!this.state.send,
    });
    if(this.state.send){
      this.enviarMail();
    }
  }
  togglePopup3() {
    this.setState({
      showPopup3: !this.state.showPopup3,
      confirmado:false,
     
    });
  }
  togglePopup4() {
    this.setState({
      showPopup4: !this.state.showPopup4,
      ambasOpciones:false,
      avanzado:false,
      password:'',
      copied1:false,
      copied2:false,
      contrasenya_avanzado:'',
      longitud:'8',
      tipo:'',
    });
  }
  setContrasenya = (e) => {
    this.setState({contrasenya: e.target.value})
  }

  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
    this.setState({avanzado:false});
    console.log("esto: ",name, " .. ", value);
  }

  handleSubmitCode =e => {
    e.preventDefault()
    //Así separo errors del resto de estado
    const {errors, ...sinErrors} = this.state
    const result = validate(sinErrors);
    
    
    this.setState({errors:result})
  
    if(!Object.keys(result).length){ //Si tiene propiedades, hay error
      //Envio formulario
      this.setState({confirmado:true})
      console.log('Formulario válido')
    }else{

      console.log('Formulario inválido')
    }

  }

  handleSubmitContra =e => {
    e.preventDefault()
    //Así separo errors del resto de estado
    const {errorsC, ...sinErrors} = this.state
    const result = validateContra(sinErrors)
    
    console.log(result)
    this.setState({errorsC:result})
  
    if(!Object.keys(result).length){ //Si tiene propiedades, hay error
      //Envio formulario
      const userToken = localStorage.getItem('token');
      this.setState({okey:true})
      this.actualizarContrasenya(userToken);
      console.log('Formulario válido')
    }else{
      
      console.log('Formulario inválido')
    }

  }
  
  handleSubmitEliminar =e => {
    const userToken = localStorage.getItem('token');
    this.eliminarCuenta(userToken)
    console.log("TOKEN: ",userToken);
    e.preventDefault();
    console.log();
    this.setState({eliminada:true})

  }
  handleSubmitCerrarSesion =e => {
    e.preventDefault()
    this.setState({redireccion:true})

  }
  handleSubmitFin=e => {
    e.preventDefault()
    this.setState({redireccion:true})
  }
  verificarPasswd=e=>{
    const actualPasswd = localStorage.getItem('contrasenyaActual');
    console.log("Actual: ", actualPasswd, " metida: ", e.target.value);
    if (e.target.value == actualPasswd){
      console.log("iguales");
      this.setState({passwdCorrecta:true});
    }else{
      console.log("diferentes");
      this.setState({passwdCorrecta:false});
    }
  }

  enviarMail(){

    console.log("SEND");
    var numberCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString();
    console.log(numberCode);
    contact.emailDestination="dgamuro9@gmail.com";
    contact.code=numberCode;
    this.setState({codigop2p:numberCode});
    emailjs.send('service_whqrweu','template_p852fwp', contact, 'user_IYHDpBrT6aoBW2dXblVJA')
		.then((response) => {
				   console.log('SUCCESS!', response.status, response.text);
		}, (err) => {
				   console.log('FAILED...', err);
		});
  }


  render () {
    const {errors,errorsC,copied2,contrasenya_avanzado,avanzado}=this.state
    return (
      
      <>
      <div className="admin">
        <pre><div className="par1">
          <button className="check1"onClick={this.togglePopup1.bind(this)}><img className="add" src={add} alt="add" onClick={this.pulsa}/></button>
          <p className="elimact">  Actualizar la contraseña</p>
        </div></pre>
        <br></br>
        <pre><div className="par2">
          <button className="check2"onClick={this.togglePopup2.bind(this)}><img className="add" src={add} alt="add" /></button>
          <p className="elimact">  Eliminar cuenta</p>
        </div></pre>
        <br></br>
        <pre><div className="par3">
          <button className="check3"onClick={this.togglePopup3.bind(this)}><img className="add" src={add} alt="add" /></button>
          <p className="elimact">  Cerrar Sesion</p>
        </div></pre>
      </div>

      {this.state.showPopup1 ? 
      
        <Popup
          text={
            <>
            {!this.state.okey ?
              'Introduzca una nueva contraseña'
              :
              'Contraseña cambiada con exito'
            }
            </>
            

          }
          cuerpo = {

              <div className="formularioCambio">
              {this.state.okey ?
              <>
              <img className="okey" src={okey} alt="okey" />
              <br></br><br></br><br></br>
              <input type='button' className="Close" value='Cerrar' onClick={this.togglePopup1.bind(this)}/>
              </>

              :
              <>
                {!this.state.confirmado ?
                <>
                  <form onSubmit={this.handleSubmitCode}>
                      <strong>Introduce el codigo que te hemos enviado:</strong>
                      <br></br><br></br>
                      <input type='password' name = "code"id="code"onChange={this.handleChange}/>
                      <br></br>
                      <strong>Introduce la contraseña actual:</strong>
                      <br></br><br></br>
                      <input type='password' name = "old"id="old"onChange={this.verificarPasswd}/>
                      {errors.code && <p className="warning">{errors.code}</p>}
                      {errors.passwdCorrecta && <p className="warning">{errors.passwdCorrecta}</p>}
            
                      <br></br><br></br>
                      <input type='submit' className="Send" value='Enviar'/>
                      <input type='button' className="Close" value='Cerrar' onClick={this.togglePopup1.bind(this)}/>
                  </form>
                </>
                :
                <>
                  <form onSubmit={this.handleSubmitContra}>
                  <pre>
                    <label className="passwdControl" htmlFor="contrasenya"><label>                          </label>Nueva contraseña     
                      <label>      </label>
                      <input type='password' name = "contrasenya"id="contrasenya"onChange={this.handleChange} value={this.state.contrasenya}/>
                      <label> </label>
                      <input type="button" className="editButton" onClick={this.togglePopup4.bind(this)}/>
                
                    </label>
             
                    <PasswordStrengthMeter password = {this.state.contrasenya}/>
                      {errorsC.contrasenya && <p className="warning">{errorsC.contrasenya}</p>}
                    <br></br>
                    <div className="contrasenyaRepita">
                    <label htmlFor="contrasenya">Repita la contraseña  </label>
                      <input type='password' name = "contrasenya_verif"id="contrasenya_verif"onChange={this.handleChange} value={avanzado ? this.state.contrasenya:undefined}/>
                      {errorsC.contrasenya_verif && <p className="warning">{errorsC.contrasenya_verif}</p>}
                      {errorsC.coinciden && <p className="warning">{errorsC.coinciden}</p>}
                      </div>
                    </pre>
                    <br/>
                    <input type='submit' className="SendAdmin" value='Confirmar'/>
                    <input type='button' className="Close" value='Cancelar' onClick={this.togglePopup1.bind(this)}/>
                    
                    </form>
                </>
                }
              </>  
              }
              </div>
            
          }
          closePopup={this.togglePopup1.bind(this)}
          eliminada={false}
        />
        : null
      }
      {this.state.showPopup2 ? 
        <Popup
        
          text={
            <>
            {this.state.eliminada ?
              'Cuenta eliminada con exito'
              
              :
              '¿Seguro que desea eliminar la cuenta?'
            }
            </>
          }

          cuerpo = {

              <div className="formularioElimino">

                {!this.state.eliminada ?
                <>
                 {!this.state.confirmado ?
                  <form onSubmit={this.handleSubmitCode}>
                      <strong>Introduce el codigo que te hemos enviado:</strong>
                      <br></br><br></br>
                      <input type='password' name = "code"id="code"onChange={this.handleChange}/>
                      <br></br>
                      <strong>Introduce la contraseña actual:</strong>
                      <br></br><br></br>
                      <input type='password' name = "old"id="old"onChange={this.verificarPasswd}/>
                      {errors.code && <p className="warning">{errors.code}</p>}
                      {errors.iguales && <p className="warning">{errors.iguales}</p>}
            
                      <br></br><br></br>
                      <input type='submit' className="Send" value='Enviar'/>
                      <input type='button' className="Close" value='Cerrar' onClick={this.togglePopup2.bind(this)}/>
                  </form>
                  :
                    <form onSubmit={this.handleSubmitEliminar}>
                    <input type='submit' className="Send" value='Confirmar'/>
                    <button onClick={this.togglePopup2.bind(this)}>Cancelar</button>
                </form>

                 }
                </>
                  :
                <>
                <img className="okey" src={okey} alt="okey" />
                <form onSubmit={this.handleSubmitFin}>
                  <input type='submit' className="Send" value='Salir'/>
                  {this.state.redireccion && <Redirect to="/"/>}
                  </form>
                </>
                } 



              </div>
          }
         
         
        />
        : null
      }
      
      {this.state.showPopup3 ? 
        <Popup
            
          text= '¿Seguro que desea cerrar sesión?'
          
          cuerpo = {
            <div className="formularioCierroSesion">
              <form onSubmit={this.handleSubmitCerrarSesion}>
                <input type='submit' className="Send" value='Confirmar'/>
                <button onClick={this.togglePopup3.bind(this)}>Cancelar</button>
                {this.state.redireccion && <Redirect to="/"/>}
              </form>
            </div>
          }
        />
        : null
      }
      {this.state.showPopup4 ? 
              <Popup
                text='Contraseña'
                cuerpo = {
                  <>

                  <div className="meter1">
                    {/*<strong>Escribe una contraseña</strong>
                    <br></br>
                    <input autoComplete="off" type="password" onChange={e => this.setState({ password: e.target.value,copied:false})} />
                    <CopyToClipboard text={password} onCopy={e => this.setState({ copied1:true})}><button className="copyTC">Copiar</button></CopyToClipboard>
                    {copied1 ? this.mensaje(): null}
                    <PasswordStrengthMeter password = {password}/>*/}
                    <strong>Gener una contraseña</strong>
                    <br/>
                  
                    <input autoComplete="off" type="text" onChange={e => this.setState({ contrasenya_avanzado: e.target.value,copied:false})} readOnly="readonly" value={this.state.contrasenya_avanzado}/>
                    <CopyToClipboard text={contrasenya_avanzado} onCopy={e => this.setState({ copied2:true})}><button className="copyTC">Copiar</button></CopyToClipboard>
                    {copied2 ? this.mensaje() : null}
                    <br/>
                    <div className="botones">
                      <input  id="input1" name="radio" type="radio" onChange={this.generarContrasenyaDebil}/> Numeros <br></br>
                      <input  id="input2" name="radio" type="radio" onChange={this.generarContrasenyaMedia}/>  Numeros y letras<br></br>
                      <input  id="input3" name="radio" type="radio" onChange={this.generarContrasenyaFuerte}/> Numeros, letras y caracteres especiales<br></br><br></br>
                      <pre><input type="range" min="8" max="20"  defaultValue={this.state.longitud} onChange={ e => this.setLongitud(e.target) }/>   {this.state.longitud}</pre>
                    </div>
                  </div>

                    <input type='submit' className="Send" value='Guardar' onClick={this.comprobarPasswd}/>
                    <input type='button' className="Close" value='cancelar' onClick={this.togglePopup4.bind(this)}/>
                    {this.state.ambasOpciones && <p className="warning">"Rellene solo una opcion"</p>}
                  </>

                }
              
              
              />
              :null
        }
            </>
    )
  }
}

export default CuerpoAdministracion
























