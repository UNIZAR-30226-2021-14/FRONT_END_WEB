import React from 'react'
import add from '../imagenes/add.png'
import cajaFuerte from '../imagenes/cajaFuerte.png'
import Popup from './Popup.js'
import ArrayList from './ArrayList.js'
import 'bootstrap/dist/css/bootstrap.min.css'


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
      isFetch: true,
      showPopup:false,
      fecha_actual:fecha(),
      fecha_caducidad:'',
      nombre:'',
      url:'',
      usuario:'',
      password:'',
      email:'',
      errors: {},
    }
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      errors: {},
      fecha_caducidad:'',
      nombre:'',
      url:'',
      usuario:'',
      password:'',
      email:'',
      fecha_actual:fecha(),
      isFectch: true,
    });
  }


  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
    console.log(this.state.code)
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
    const { isFectch,errors} = this.state

    return (
      <>
      {
        isFectch && 'Loading...' //Si es true entonces muestra loading... Si loading fuera componente se pondría <Loading/> 
      }
      
      <div className="Filtro">
        <br></br><br></br>
        <ArrayList />
      </div>
      <div className="cajaFuerte">
        <img className="caja" src={cajaFuerte} alt="cajaFuerte" />
      </div>
      <div className="textoImagen">
        <p>No hay ningún contenido</p>
        <p>Haga click en el icono + de la derecha</p>
      </div>
      <button className="addButton" onClick={this.togglePopup.bind(this)}><img className="add" src={add} alt="add" /></button>
      {this.state.showPopup ? 
          <Popup
            text='Introduzca su par usuario-contraseña:'
            cuerpo={
              <>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre"id="nombre" onChange={this.handleChange}/>
                {errors.nombre && <p className="warning">{errors.nombre}</p>}

                <br/>
                <label htmlFor="url">URL</label>
                <input type="text" name="url"id="url" onChange={this.handleChange}/>
                {errors.url && <p className="warning">{errors.url}</p>}

                <br/>
                <label htmlFor="usuario">Usuario</label>
                <input type="text" name="usuario"id="usuario" onChange={this.handleChange}/>
                {errors.usuario && <p className="warning">{errors.usuario}</p>}

                <br/>
                <label htmlFor="password">Contraseña</label>
                <input type='password' name = "password"id="password" onChange={this.handleChange}/>
                {errors.password && <p className="warning">{errors.password}</p>}

                <br/>
                <ArrayList />
                <label htmlFor="email">Email</label>
                <input type="email" name="email"id="email" onChange={this.handleChange}/>
                {errors.email && <p className="warning">{errors.email}</p>}

                <br/>
              
                <label htmlFor="fecha_actual">Fecha de activación</label>
                <input type="date" name="fecha_actual"id="fecha_actual" value={this.state.fecha_actual} onChange={this.handleChange}/>
                {errors.fecha_actual && <p className="warning">{errors.fecha_actual}</p>}

                <br/>
                <label htmlFor="fecha_caducidad">Fecha de caducidad</label>
                <input type="date" name="fecha_caducidad"id="fecha_caducidad" placeholder={"DD-MM-YYYY"} onChange={this.handleChange}/>
                {errors.fecha_caducidad && <p className="warning">{errors.fecha_caducidad}</p>}

                <br/>
                <input type='submit' className="Send" value='Enviar'/>
              </form>
                </>
            }
           
            closePopup={this.togglePopup.bind(this)}
            eliminada={false}
          />
          : null
        }
    </>
    )
  }
}

export default CuerpoContraseña
