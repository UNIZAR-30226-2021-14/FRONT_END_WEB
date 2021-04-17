import React from 'react'
import add from '../../../imagenes/add.png'
import cajaFuerte from '../../../imagenes/cajaFuerte.png'
import Popup from '../../PopUp/Popup.js'
import ArrayList from '../../Desplegable/ArrayList.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import PasswordStrengthMeter from '../../SeguridadContrasenya/PasswordStrengthMeter';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ArrayListJerarquia from '../../Desplegable/ArrayListJerarquia.js'
import contrasenyas from '../../../imagenes/contrasenyas.png'
const validate = values =>{
  const errors = {}

  if (!values.fecha_actual){
    errors.fecha_actual = 'Introduzca fecha válida'
  }
  if (!values.fecha_caducidad || !/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9][0-9][0-9]/.test(values.fecha_caducidad) || values.fecha_actual >= values.fecha_caducidad){
    errors.fecha_caducidad = 'Introduzca fecha válida'
  }
  if (!values.nombre){
    errors.nombre = 'Introduzca nombre válido'
  }
  if (!values.url){
    errors.url = 'Introduzca url válida'
  }
  if (!values.usuario){
    errors.usuario = 'Introduzca usuario válido'
  }
  if (!values.password){
    errors.password = 'Introduzca una contraseña'
  }
  if (!values.email || !/[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/.test(values.email)){
    errors.email = 'Introduzca email válido'
  }
  return errors

}
function fecha(){
  var actual= new Date();
  console.log(actual);
  var dia = actual.getDate();
  var anyo = actual.getFullYear();
  var mes = actual.getMonth() + 1;


  //this.setState=({fecha_actual:actual});
  return `${dia}-${mes}-${anyo}`;
}
class CuerpoContraseña extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
      showPopup:false,
      fecha_actual:fecha(),
      fecha_caducidad:'',
      nombre:'',
      url:'',
      usuario:'',
      contrasenya:'',
      email:'',
      errors: {},
      ambasOpciones:false,
      avanzado:false,
      password:'',
      copied1:false,
      copied2:false,
      contrasenya_avanzado:'',
      longitud:'8',
      tipo:'',
    }
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
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      errors: {},
      fecha_caducidad:'',
      nombre:'',
      url:'',
      usuario:'',
      contrasenya:'',
      email:'',
      fecha_actual:fecha(),
      isFectch: true,
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
  togglePopup4() {
    this.setState({
      showPopup4: !this.state.showPopup4
    });
  }
  miListaV={
    listaV:["Nombre","Fecha de creación", "Fecha de caducidad", "Categoria"]
   }
   miListaC={
    listaC:["Categoria1","Categoria 2", "Categoria 3", "Categoria 4"]
   }

  
  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
    
  }

  handleSubmit =e => {
    e.preventDefault()
    //Así separo errors del resto de estado
    const {errors, ...sinErrors} = this.state
    const result = validate(sinErrors)
    
    
    this.setState({errors:result})
  
    if(!Object.keys(result).length){ //Si tiene propiedades, hay error
      //Envio formulario
      console.log('Formulario válido')
    }else{

      console.log('Formulario inválido')
    }

  }
  render () {
    const { errors,password,copied1,copied2,contrasenya_avanzado,avanzado} = this.state

    return (
      <>
     
      
      <div className="Filtro">
        <br></br><br></br>
        <span className="bloqueArray">
          <div className="filtro3">
            <ArrayListJerarquia />
          </div>
          <div className="filtro">
          <ArrayList tipo={false} valores={this.miListaV.listaV}/>
        </div>
        </span>
      </div>
      {/*<div className="cajaFuerte">
        <img className="caja" src={cajaFuerte} alt="cajaFuerte" />
      </div>
      <div className="textoImagen">
        <p>No hay ningún contenido</p>
        <p>Haga click en el icono + de la derecha</p>
      </div>*/}
      <pre><table className="tablaContrasenya">
           <tbody>
            <tr>
              <td>
                <img className="contrasenyasDePrueba" src={contrasenyas}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              <td>
                <img className="contrasenyasDePrueba" src={contrasenyas}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              <td>
                <img className="contrasenyasDePrueba" src={contrasenyas}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              
            </tr>
           </tbody>
        </table></pre>



      <button className="addButton" onClick={this.togglePopup.bind(this)}><img className="add" src={add} alt="add" /></button>
      {this.state.showPopup ? 
          <Popup
            text='Introduzca su par usuario-contraseña:'
            cuerpo={
              <>
              <pre>
              <form onSubmit={this.handleSubmit}>
               <div  className="array"><ArrayList tipo={true} valores={this.miListaC.listaC}/></div>
               <br></br>
                <label htmlFor="nombre">Nombre                </label>
                <input type="text" name="nombre"id="nombre" onChange={this.handleChange}/>
                {errors.nombre && <p className="warning">{errors.nombre}</p>}

                <br/>
                <label htmlFor="url">URL                   </label>
                <input type="text" name="url"id="url" onChange={this.handleChange}/>
                {errors.url && <p className="warning">{errors.url}</p>}

                <br/>
                <label htmlFor="usuario">Usuario               </label>
                <input type="text" name="usuario"id="usuario" onChange={this.handleChange}/>
                {errors.usuario && <p className="warning">{errors.usuario}</p>}

                <br/>
                <label className="passwdControl" htmlFor="contrasenya">              Contraseña       
                  <label>            </label>
                  <input type='password' name = "contrasenya"id="contrasenya" onChange={this.handleChange} value={avanzado ? this.state.contrasenya:null}/>
                  <label> </label>
                  <input type="button" className="editButton" onClick={this.togglePopup4.bind(this)}/>
                </label>
                {errors.password && <p className="warning">{errors.password}</p>}

                <br/>
                
                <label htmlFor="email">Email                 </label>
                <input type="email" name="email"id="email" onChange={this.handleChange}/>
                {errors.email && <p className="warning">{errors.email}</p>}

                <br/>
              
                <label htmlFor="fecha_actual">Fecha de activación   </label>
                <input type="date" name="fecha_actual"id="fecha_actual" value={this.state.fecha_actual} onChange={this.handleChange}/>
                {errors.fecha_actual && <p className="warning">{errors.fecha_actual}</p>}

                <br/>
                
                <label htmlFor="fecha_caducidad">Fecha de caducidad    </label>
                <input type="date" name="fecha_caducidad"id="fecha_caducidad" placeholder={"DD-MM-YYYY"} onChange={this.handleChange}/>
                
                {errors.fecha_caducidad && <p className="warning">{errors.fecha_caducidad}</p>}

                <br/>
                <input type='submit' className="Send" value='Enviar'/>
                <input type='button' className="Close" value='Cerrar' onClick={this.togglePopup.bind(this)}/>

              </form>
              </pre>
                </>
            }
           

            eliminada={false}
          />
          : null
        }
        {this.state.showPopup4 ? 
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
                    <strong>O genere una a su gusto</strong>
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

export default CuerpoContraseña
