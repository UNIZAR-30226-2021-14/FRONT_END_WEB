import React,{ Component }from 'react'
import logo from '../imagenes/logo.jpg'
import Popup from './Popup.js'
import {Link} from  'react-router-dom'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import PasswordRevealer from './PasswordRevealer'
import axios from 'axios';


const validate = values =>{
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
          usuario:'',
          contrasenya:'',
          errors: {},
          redireccion:false,
          shown:false,
          login:true,
          signin:true,
          msg:'',
          token:'',
        };
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
        console.log(response.data);
        if(response.data.codigo == 1){
          this.setState({login:true,msg:'',redireccion:true,token:response.data.token},() =>{console.log(this.state.token)});
          console.log(this.state.token);
          localStorage.setItem('token', this.state.token);
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
    }
    handleSubmit =e => {
      e.preventDefault()
      //Así separo errors del resto de estado
      const {errors, ...sinErrors} = this.state
      this.iniciarSesion();
      const result = validate(sinErrors)
      
      this.setState({errors:result})
      if(!Object.keys(result).length){ //Si tiene propiedades, hay error
        //Envio formulario
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
      this.registrarse();
      const result = validate(sinErrors)
      
      this.setState({errors:result})
      if(!Object.keys(result).length){ //Si tiene propiedades, hay error
        //Envio formulario
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
                cuerpo={<p><strong></strong>correoPrueba@gmail.com<strong></strong></p>}
                closePopup={this.togglePopup1.bind(this)}
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
                      <label htmlFor="usuario">Usuario</label>
                      <input type="text" name="usuario"id="usuario" onChange={this.handleChange}/>
                      {errors.usuario && <p className="warning">{errors.usuario}</p>}
                      <br/>
                      <label htmlFor="contrasenya">Contraseña</label>
                      <input type='password' name = "contrasenya"id="contrasenya"onChange={this.handleChange}/>
                      {errors.contrasenya && <p className="warning">{errors.contrasenya}</p>}
                      {!this.state.login && <p className="warning">"No existe el usuario"</p>}

                      <br/>
                     <input type='submit' className="Send" value='Enviar'/>
                    

                     {this.state.redireccion && <Redirect to="/paginaSecundaria"/>}
                  
                    </div>
                    </form>
                }
                closePopup={this.togglePopup2.bind(this)}
                eliminada={false}
             />
            : null
            }
            {this.state.showPopup3 ? 
              <Popup
                text='Registrate'
                cuerpo = {
                  <form onSubmit={this.handleSubmitRegistro}>
                  <div className="formularioLogin">
                    <label htmlFor="usuario">Usuario</label>
                    <input type="text" name="usuario"id="usuario" onChange={this.handleChange}/>
                    {errors.usuario && <p className="warning">{errors.usuario}</p>}
                    <br/>
                    <label htmlFor="contrasenya">Contraseña</label>
                    <input type="password" name = "contrasenya"id="contrasenya"onChange={this.handleChange}/>
                    {errors.contrasenya && <p className="warning">{errors.contrasenya}</p>}
                    {!this.state.signin && <p className="warning">"El usuario ya existe"</p>}

                    <br/>
                   <input type='submit' className="Send" value='Enviar'/>
                   {this.state.redireccion && <Redirect to="/paginaSecundaria"/>}
                
                  </div>
                  </form>
                }
                closePopup={this.togglePopup3.bind(this)}
                eliminada={false}
             />
            : null
            }
            </>
          )
    }

}

export default Cabecera




