import React, {useState} from 'react'
import add from '../../../imagenes/add.png'
import cajaFuerte from '../../../imagenes/cajaFuerte.png'
import Popup from '../../PopUp/Popup.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ArrayListJerarquia from '../../Desplegable/ArrayListJerarquia.js'
import ArrayList from '../../Desplegable/ArrayList.js'
import documentos from '../../../imagenes/documentos.jpg'
import 'materialize-css/dist/css/materialize.min.css'

function fecha(){
  var actual= new Date();

  var dia = actual.getDate();
  var anyo = actual.getFullYear();
  var mes = actual.getMonth() + 1;
  var resDia = dia.toString();
  var resMes = mes.toString();
  var resAnyo = anyo.toString();

  if (dia < 10){
    resDia = "0"+resDia;
  }
  if (mes < 10){
    resMes = "0"+resMes;
  }

  //this.setState=({fecha_actual:actual});
  return resDia+"-"+resMes+"-"+resAnyo;
}

function verificarFecha(fechaVerif){

  var valida = false;
  var anyo = Number(fechaVerif[6] + fechaVerif[7] + fechaVerif[8] + fechaVerif[9]);
  var dia = Number(fechaVerif[0] + fechaVerif[1]);
  var mes = Number(fechaVerif[3] +  fechaVerif[4]);
  
  if(dia == 30 || dia == 31 || mes == 2){

    if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12){
      if(dia == 31){
        valida = true;
      }
    }else if (mes == 2){
      if ((anyo % 4 == 0 && anyo % 100 != 0)||(anyo % 400 == 0)){
        if(dia == 29){
          valida = true;
        }
      }else{
        if(dia == 28){
          valida = true;
        }
      }
    }else if(mes == 4 || mes == 6 || mes == 9){
      if(dia == 30){
        valida = true;
      }
    }
  }else{
    valida = true;
  }
  return valida;
}

function compararFechas(fecha1,fecha2){

  var fechaAct = Number(fecha1.split("-").reverse().join("-").replace(/-/g,""));
  var fechaCad = Number(fecha2.split("-").reverse().join("-").replace(/-/g,""));
  
  return fechaAct < fechaCad;

}
const validate = values =>{
  const errors = {}

  if (!values.nombreDoc){
    errors.nombreDoc = 'Introduzca nombre válido'
  }
  if (!values.expiracionDoc || !/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9][0-9][0-9]/.test(values.expiracionDoc) || !compararFechas(values.creacionDoc,values.expiracionDoc) || !verificarFecha(values.expiracionDoc)){
    errors.expiracionDoc = 'Introduzca fecha válida'
  }
  
  return errors

}
class CuerpoDocumentos extends React.Component {

  constructor(props){
    super(props)
    this.state = {
     
      showPopup:false,
      nombreDoc:'',
      errors: {},
      creacionDoc:fecha(),
      expiracionDoc:'',
      cargaContenido:true,
      token: localStorage.getItem('token'),
      listadoCategorias:[],
      vacio:true,
    }
    this.subirArchivos=this.subirArchivos.bind(this);
  }
  miListaV={
    listaV:["Nombre","Fecha de creación", "Fecha de caducidad", "Categoria"]
   }
   miListaVNnom={
    listaV:["Nombre1","Nombre2", "Nombre3", "Nombre4"]
   }
   miListaVFCreac={
    listaV:["Fecha1","Fecha2", "Fecha3", "Fecha4"]
   }
   miListaVFCad={
    listaV:["Fecha1","Fecha2", "Fecha3", "Fecha4"]
   }
   miListaVCat={
    listaV:["Categoria1","Categoria2", "Categoria3", "Categoria4"]
   }
  miListaC={
    listaC:["sin categorias disponibles"]
   }
   
   selectCategorias=async(value)=>{
    console.log("ENTRAAA2");
    //const query = {ordenarPor:this.state.ordenarPor,ordenarDe:this.state.ordenarDe};
    //const headers = {'Authorization':`Bearer ${value}`};
    const config = {
      headers: {'Authorization':`Bearer ${value}`},
    }
    await axios.get('https://fresh-techh.herokuapp.com/getcat',config
    )
    .then(response =>{
      console.log(response.data);
      this.setState({listadoCategorias:response.data,cargaContenido:false});
    })
  }
  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
   
  }
  subirArchivos(e){
    let file = e.target.files[0];
    console.log(file);
    
    if (file) {
      let data = new FormData();
      data.append('file', file);
      // axios.post('/files', data)...
    }
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    let array = this.state.listadoCategorias;
    if(array.length > 0){
      this.miListaC.listaC = array.map((data) => data.nombrecat);
    }
    
  }
  handleSubmit =e => {
    e.preventDefault()
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
    const {errors,cargaContenido,token} = this.state
    {cargaContenido && this.selectCategorias(token)}
    return ( 
        <> 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
     
        <div className="filtro2">
          <ArrayListJerarquia />
        </div>


        
      {this.state.vacio ?
      <>
        <div className="cajaFuerte">
          <img className="caja" src={cajaFuerte} alt="cajaFuerte" />
        </div>
        <div className="textoImagen">
          <p>No hay ningún contenido</p>
          <p>Haga click en el icono + de la derecha</p>
        </div>
      </>
        :
        <div className="contenido">
         <p>contenido</p>
        </div>
        }
       {/*<pre><table className="tablaDocumentos">
           <tbody>
            <tr>
              <td>
                <img className="documentosDePrueba" src={documentos}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              <td>
                <img className="documentosDePrueba" src={documentos}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              <td>
                <img className="documentosDePrueba" src={documentos}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              
            </tr>
           </tbody>
          </table></pre>*/}
        <button className="addButton" onClick={this.togglePopup.bind(this)}><img className="add" src={add} alt="add" /></button>
        {this.state.showPopup ? 
        
          <Popup
            text='Selecciona los ficheros:'
            cuerpo={
              <>
       
              <form className="pup" onSubmit={this.handleSubmit}>

               
                <span className="par">
              
                  <input type="file" name="files" multiple onChange={this.subirArchivos}/>
          
                  <pre>      </pre>
                  <ArrayList tipo={true} valores={this.miListaC.listaC}/>
                </span>
                

                {/*<label htmlFor="nombreDoc"><pre>Nombre               </pre></label>
                  <input type="text" name="nombreDoc"id="nombreDoc" onChange={this.handleChange}/>
            {errors.nombreDoc && <p className="warning">{errors.nombreDoc}</p>}*/}

                <div className="input-field">
                  <i className="material-icons prefix">assignment</i>
                  <input type="text" name="nombreDoc"id="nombreDoc" onChange={this.handleChange} placeholder="Nombre"/>
                  {errors.nombreDoc && <p className="warning">{errors.nombreDoc}</p>}
                </div>
             
                <div className="input-field">
                  <i className="material-icons prefix">event_available</i>
                  <input type="date" className="fechaActual" name="creacionDoc"id="creacionDoc" value={"Fecha de creación: "+ this.state.creacionDoc} onChange={this.handleChange}/>
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">event_busy</i>
                  <input type="date" name="expiracionDoc"id="expiracionDoc" placeholder={"Fecha de caducidad: DD-MM-YYYY"} onChange={this.handleChange}/>
                  {errors.expiracionDoc && <p className="warning">{errors.expiracionDoc}</p>}
                </div>

               {/* <br/>
                <label htmlFor="creacionDoc"><pre>Fecha de creación    </pre></label>
                  <input type="date" name="creacionDoc"id="creacionDoc" value={this.state.creacionDoc} onChange={this.handleChange}/>
               */}

               {/*<br/>
                <label htmlFor="expiracionDoc"><pre>Fecha de expiración  </pre></label>
                  <input type="date" name="expiracionDoc"id="expiracionDoc" placeholder={"DD-MM-YYYY"} onChange={this.handleChange}/>
                  {errors.expiracionDoc && <p className="warning">{errors.expiracionDoc}</p>}

                <br/>*/}
                <br></br>
                <input type='submit' className="btn btn-primary mr-2" value='Subir'/>
                <input type='button' className="btn btn-primary" value='Cerrar' onClick={this.togglePopup.bind(this)}/>
              </form>
              
              </>
            }
            //sendData={<button type="Submit" className="Send" onClick={() => this.postData()}>Send</button>}
           
            eliminada={false}

          />
          
          : null
        }
       
      </>
    )
  }
}

export default CuerpoDocumentos