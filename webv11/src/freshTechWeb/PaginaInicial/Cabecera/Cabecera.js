import React from 'react'
import logo from '../../../imagenes/logo.jpg'
import Popup from '../../PopUp/Popup.js'
import {Link} from  'react-router-dom'
import edit from '../../../imagenes/edit.png'
import { Redirect } from 'react-router';
import PasswordStrengthMeter from '../../SeguridadContrasenya/PasswordStrengthMeter';
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import emailjs from 'emailjs-com';
import Email from '../../Email/Email.js'

import 'materialize-css/dist/css/materialize.min.css'

const validate = values =>{
  const errors = {}
  console.log("ERROR: ", values.registro);
  if (!values.usuario){
    errors.usuario = 'Ingrese un usuario válido'
  }
  if (!values.contrasenya){
    errors.contrasenya = 'Ingrese una contraseña válida'
  }

  if(!values.registro){
    errors.registro = 'Contraseña no es segura'
    
  }

  return errors

}
const validateLogin = values =>{
  const errors = {}
 
  if (!values.usuario){
    errors.usuario = 'Ingrese un usuario válido'
  }
  if (!values.contrasenya){
    errors.contrasenya = 'Ingrese una contraseña válida'
  }


  return errors

}


class Cabecera extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          showPopup1:false,
          showPopup2:false,
          showPopup3:false,
          showPopup4:false,
          usuario:'',
          contrasenya:'',
          errors: {},
          redireccion:false,
          shown:false,
          login:true,
          signin:true,
          msg:'',
          token:'',
          email:'',
          //ambasOpciones:false,
          //avanzado:false,
          //password:'',
          //copied1:false,
          //copied2:false,
          //contrasenya_avanzado:'',
          //longitud:'8',
          //tipo:'',
          registro:false,
         
          
        };
    }
    

   /*
    componentDidMount() {
      this.buildPassword();
    }

   generarContrasenyaDebil =e =>{
      this.setState({tipo:"debil"});
  
    }
    generarContrasenyaMedia =e =>{
      this.setState({tipo:"media"});
  
    }
    generarContrasenyaFuerte =e =>{
      this.setState({tipo:"fuerte"});
  
    }*/
    /*
    comprobarPasswd = (e) => {
      
      if ((this.state.password == '' && this.state.contrasenya_avanzado == '') || (this.state.password != '' && this.state.contrasenya_avanzado != '')){
        this.setState({ambasOpciones:true});
      }else{
        this.setState({ambasOpciones:false,avanzado:true});
        if (this.state.password != ''){
          this.setState({contrasenya:this.state.password});
        }else{
          this.setState({contrasenya:this.state.contrasenya_avanzado});
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
    */

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
        if((/[!@#$%*]/.test(value.charAt(i)))){
          val3=true;
        }
        
      }
      let result =  val1 && val2 && val3;
      this.setState({registro:result},()=>console.log("resultado: ",this.state.registro, " contra: ", value));
    }

    mensaje(){
      
      return <span style={{color: 'red'}}>Copiado</span>
      
    }

    togglePopup1() {
      this.setState({
        showPopup1: !this.state.showPopup1
      });
    }
    togglePopup2() {
      this.setState({
        showPopup2: !this.state.showPopup2,
        errors:{},
        login:true,
      });
    }
    togglePopup3() {
      this.setState({
        showPopup3: !this.state.showPopup3,
        contrasenya:"",
        errors:{},
        signin:true,
        
      });
    }
    togglePopup4() {
      this.setState({
        showPopup4: !this.state.showPopup4
      });
    
    }
    /*async postData(){
      try{
        
          let result = await fetch('https://fresh-techh.herokuapp.com/signin',{
            method: 'post',
            mode:'cors',
            headers: {
              'Accept': 'application/json',
              'Content-type':'application/json',
            },
            body: JSON.stringify({
              nombre: this.state.usuario,
              password: this.state.contrasenya
            })
          });
          console.log(result)
      } catch (e) {
        console.log(e) 
      }
    }*/
   iniciarSesion=async()=>{
      await axios.post('https://fresh-techh.herokuapp.com/login',{nombre:this.state.usuario,password:this.state.contrasenya})
      .then(response =>{
        console.log("RESPUESTA: ", response.data);
        if(response.data.codigo == 1){
          this.setState({login:true,msg:'',redireccion:true,token:response.data.token},() =>{console.log(this.state.token)});
          console.log(this.state.token);
          localStorage.setItem('token', this.state.token);
          localStorage.setItem('contrasenyaActual', this.state.contrasenya);
          localStorage.setItem('correo', this.state.usuario);
        }
      })
      .catch(error=>{
        console.log(error.response.data);
        if(error.response.data.codigo == 0){
          this.setState({login:false,msg:error.response.data.message,redireccion:false});
          
        }
      })
    }

    registrarse= async()=>{
      await axios.post('https://fresh-techh.herokuapp.com/signin',{nombre:this.state.usuario,password:this.state.contrasenya})
      .then(response =>{
        console.log(response.data);
        if(response.data.message == 1){
          this.setState({signin:true,msg:'',redireccion:true});
          console.log(this.state.signin);
          localStorage.setItem('correo', this.state.usuario);
        }
      })
      .catch(error=>{
        console.log(error.response.data);
        if(error.response.data.message == 0){
          this.setState({signin:false,redireccion:false});
          
        }
      })
    }

    setUsuario = (e) => {
      this.setState({usuario: e.target.value})
    }
    setContrasenya = (e) => {
      this.setState({contrasenya: e.target.value})
    }
    handleChange = ({target}) => {
      const{name,value} = target
      this.setState({[name]:value})
      this.setState({erros:{},login:true});
    }
    handleChange2 = ({target}) => {
      const{name,value} = target
      this.setState({[name]:value})
      this.validarPassword(value);
    }
    handleSubmit =e => {
      e.preventDefault()
      //Así separo errors del resto de estado
      const {errors, ...sinErrors} = this.state
      
      const result = validateLogin(sinErrors)
      
      this.setState({errors:result})
      if(!Object.keys(result).length){ //Si tiene propiedades, hay error
        //Envio formulario
        this.iniciarSesion();
        console.log('Formulario válido')
        //this.postData()
        
      }else{
        this.setState({redireccion:false});
        console.log('Formulario inválido')
      }

    }
  
    handleSubmitRegistro =e => {
      e.preventDefault()
      //Así separo errors del resto de estado
      const {errors, ...sinErrors} = this.state
      
      console.log(this.state.registro);
      const result = validate(sinErrors)
      
      this.setState({errors:result})
      if(!Object.keys(result).length){ //Si tiene propiedades, hay error
        //Envio formulario
        this.registrarse();
        console.log('Formulario válido')
        //this.postData()
      
        
      }else{
        this.setState({redireccion:false});
        console.log('Formulario inválido')
      }

    }
  

    
  
    render () {
    
        const {errors}=this.state
        return (
          <>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
       


            <table className="cabecera">
              <tbody>
                <tr>
                  
                  <td><Link to="/"><img className="logoEmpresa" src={logo} alt="Logo"/></Link></td>
                  <td><button className="contacto" onClick={this.togglePopup1.bind(this)}>Contacta con nosotros</button></td>
                  <td><button className="login" onClick={this.togglePopup2.bind(this)}>Login</button></td>
                  <td><button className="SignIn" onClick={this.togglePopup3.bind(this)}>Sign-In</button></td>
                </tr>
              </tbody>
              
            </table>

            {this.state.showPopup1 ? 
              <Popup
                text='Contacta con nosotros!'
                cuerpo={
                  <>
         
                    <pre><div className="emailBlock">
                     
                      <button className="btn-floating blue" onClick={this.togglePopup4.bind(this)}>
                        <i class="material-icons circle">mail</i>
                      </button>
                      <label>  </label>
                      <p className="email">freshtech@gmail.com</p>
                    <br></br>
                   
                   </div></pre>
                    <br></br><br></br>
                    <input type='button' className="btn waves-effect waves-light" value='Cerrar' onClick={this.togglePopup1.bind(this)}/>
                  </>
                }
                
                eliminada={false}
             />
            : null
            }
            {this.state.showPopup2 ? 
              <Popup
                text='Inicia sesión'
                cuerpo = {
                  <form onSubmit={this.handleSubmit}>
                    <div className="formularioLogin">
                    
                      <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input type="text" name="usuario"id="usuario" onChange={this.handleChange} placeholder={"Usuario"}/>
                        {errors.usuario && <p className="warning">{errors.usuario}</p>}
                      </div>
                      <br/>
                      <div className="input-field col s6">
                        <i class="material-icons prefix">lock_open</i>
                        <input type='password' name = "contrasenya"id="contrasenya"onChange={this.handleChange} placeholder={"Contraseña"}/>
                        {errors.contrasenya && <p className="warning">{errors.contrasenya}</p>}
                        {!this.state.login && <p className="warning">"No existe el usuario"</p>}
                      </div>
                   
                    {/* <label htmlFor="usuario"><pre>Usuario     </pre></label>
                      <i class="material-icons prefix">account_circle</i>
                      <input type="email" name="usuario"id="usuario" onChange={this.handleChange}/>
                      {errors.usuario && <p className="warning">{errors.usuario}</p>}
                    */}



{/*
                      <br/>
                      <label htmlFor="contrasenya"><pre>Contraseña  </pre></label>
                      <input type='password' name = "contrasenya"id="contrasenya"onChange={this.handleChange}/>
                      {errors.contrasenya && <p className="warning">{errors.contrasenya}</p>}
                      {!this.state.login && <p className="warning">"No existe el usuario"</p>}
*/}
                      <br/>
                      <br></br> <br></br>  <br></br>
                     <input class="btn waves-effect waves-light mr-5" type='submit'  value='Enviar'/>
                     <input class="btn waves-effect waves-light" type='button'  value='Cerrar' onClick={this.togglePopup2.bind(this)}/>

                     {this.state.redireccion && 
                      <>
                        {localStorage.removeItem('categoria')}
                        {localStorage.removeItem('ordenarPor')}
                        {localStorage.removeItem('ordenarDe')}
                        <Redirect to="/paginaSecundaria"/>
                      </>
                     }
                  
                    </div>
                    </form>
                }
                
                eliminada={false}
             />
            : null
            }
            {this.state.showPopup3 ? 
              <Popup
                text='Registrate'
                cuerpo = {
                  <pre>
                  <form onSubmit={this.handleSubmitRegistro}>
                  <div className="formularioLogin">

                  <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <input type="email" name="usuario"id="usuario" onChange={this.handleChange} placeholder={"Usuario"}/>
                        {errors.usuario && <p className="warning">{errors.usuario}</p>}
                  </div>
                  <br/>
                  <div className="input-field col s6">
                        <i class="material-icons prefix">lock_open</i>
                        <input type="password" name = "contrasenya"id="contrasenya"onChange={this.handleChange2} value={this.state.contrasenya} placeholder={"Contraseña"}/>
                        <PasswordStrengthMeter password = { this.state.contrasenya}/>
                        {errors.contrasenya && <p className="warning">{errors.contrasenya}</p>}
                        {!this.state.signin && <p className="warning">"El usuario ya existe"</p>}
                        {errors.registro && <p className="warning">{errors.registro}</p>}
                  </div>



                {/*<label className="user" htmlFor="usuario">Usuario</label>
                    <label>             </label>
                    <input type="email" name="usuario"id="usuario" onChange={this.handleChange}/>
                    {errors.usuario && <p className="warning">{errors.usuario}</p>}
                    <br/>
                <br></br>*/}

            {/*
                      <label className="passwdControl" htmlFor="contrasenya">Contraseña       
                        <label>        </label>
                        <input type="password" name = "contrasenya"id="contrasenya"onChange={this.handleChange2} value={this.state.contrasenya}/>
                        <label> </label>
            <input type="button" className="editButton" onClick={this.togglePopup4.bind(this)}/>
                      </label>
                      <PasswordStrengthMeter password = { this.state.contrasenya}/>
                      {errors.contrasenya && <p className="warning">{errors.contrasenya}</p>}
                      {!this.state.signin && <p className="warning">"El usuario ya existe"</p>}
                      {errors.registro && <p className="warning">{errors.registro}</p>}
                    <br/>
                    
            */}



                    <input type='submit' className="btn waves-effect waves-light mr-5" value='Enviar'/>
                    <input type='button' className="btn waves-effect waves-light" value='Cerrar' onClick={this.togglePopup3.bind(this)}/>
                    {this.state.redireccion && 
                    <>
                      {localStorage.removeItem('categoria')}
                      {localStorage.removeItem('ordenarPor')}
                      {localStorage.removeItem('ordenarDe')}
                      <Redirect to="/paginaSecundaria"/>
                    </>
                    }
                
                  </div>
                  </form>
                  </pre>
                }
               
                eliminada={false}
             />
            : null
            }

            {this.state.showPopup4 ? 
              <Popup
                text='Contacta con nosotros'
                cuerpo = {
                  <>
                    <Email tipo={false} close={this.togglePopup4.bind(this)}/>
                  </>

                }
              />
            :null
            }



             {/*{this.state.showPopup4 ? 
              <Popup
                text='Contraseña'
                cuerpo = {
                  <>

                  <div className="meter1">
                    <strong>Escribe una contraseña</strong>
                    <br></br>
                    <input autoComplete="off" type="password" onChange={e => this.setState({ password: e.target.value,copied:false})} />
                    <CopyToClipboard text={password} onCopy={e => this.setState({ copied1:true})}><button className="copyTC">Copiar</button></CopyToClipboard>
                    {copied1 ? this.mensaje(): null}
                    <PasswordStrengthMeter password = {password}/>
                    }
                    <strong>Genere una contraseña a su gusto</strong>
                    <br/>
                  
                    <input autoComplete="off" type="text" onChange={e => this.setState({ contrasenya_avanzado: e.target.value,copied:false})} readOnly="readonly" value={this.state.contrasenya_avanzado}/>
                    <CopyToClipboard text={contrasenya_avanzado} onCopy={e => this.setState({ copied2:true})}><button className="copyTC">Copiar</button></CopyToClipboard>
                    {copied2 ? this.mensaje() : null}
                    <PasswordStrengthMeter password = {contrasenya_avanzado}/>
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
             }*/}
            </>
          )
    }

}

export default Cabecera




