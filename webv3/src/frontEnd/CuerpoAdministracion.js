import { HourglassFullSharp } from '@material-ui/icons'
import Popup from './Popup.js'
import React from 'react'
import add from '../imagenes/add.png'
import okey from '../imagenes/okey.png'
import { Redirect } from 'react-router';
import axios from 'axios';

const validate = values =>{
  const errors = {}

  if (!values.code || values.code != "123"){
    errors.code = 'Codigo incorrecto'
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
    };
    
  }
  
  eliminarCuenta=async(value)=>{
    
    await axios.post('https://fresh-techh.herokuapp.com/removeAccount',
      null,
      {headers: {'Authorization':`Bearer ${value}`}},
    )
    .then(response =>{
      console.log(response.data);
      
    })
    .catch(error=>{
      console.log(error.response.data);
     
    })
  }

  togglePopup1() {
    this.setState({
      showPopup1: !this.state.showPopup1
    });
  }
  togglePopup2() {
    this.setState({
      showPopup2: !this.state.showPopup2
    });
  }
  togglePopup3() {
    this.setState({
      showPopup3: !this.state.showPopup3
    });
  }
  setContrasenya = (e) => {
    this.setState({contrasenya: e.target.value})
  }

  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
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
      this.setState({okey:true})
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

  render () {
    const {errors,errorsC}=this.state
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
              </>

              :
              <>
                {!this.state.confirmado ?
                <>
                  <form onSubmit={this.handleSubmitCode}>
                    <label htmlFor="code">Introduce el codigo que te hemos enviado</label>
                    <input type='password' name = "code"id="code"onChange={this.handleChange}/>
                    {errors.code && <p className="warning">{errors.code}</p>}
                    <input type='submit' className="Send" value='Enviar'/>
                  </form>
                </>
                :
                <>
                  <form onSubmit={this.handleSubmitContra}>
                    <div className="contrasenyaCambio">
                      Nueva contraseña
                      <input type='password' name = "contrasenya"id="contrasenya"onChange={this.handleChange} value={this.state.contrasenya}/>
                      {errorsC.contrasenya && <p className="warning">{errorsC.contrasenya}</p>}
                    </div>
                    <br></br>
                    <div className="contrasenyaRepita">
                      Repita la contraseña
                      <input type='password' name = "contrasenya_verif"id="contrasenya_verif"onChange={this.handleChange}/>
                      {errorsC.contrasenya_verif && <p className="warning">{errorsC.contrasenya_verif}</p>}
                      {errorsC.coinciden && <p className="warning">{errorsC.coinciden}</p>}
                      </div>
                    <br/>
                    <input type='submit' className="Send" value='Confirmar'/>
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
                   <form onSubmit={this.handleSubmitEliminar}>
                      <input type='submit' className="Send" value='Confirmar'/>
                      <button onClick={this.togglePopup2.bind(this)}>Cancelar</button>
                    </form>
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
          closePopup={this.togglePopup2.bind(this)}
          eliminada={this.state.eliminada}
         
         
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
          closePopup={this.togglePopup3.bind(this)}
        />
              : null
            }
            </>
    )
  }
}

export default CuerpoAdministracion
























