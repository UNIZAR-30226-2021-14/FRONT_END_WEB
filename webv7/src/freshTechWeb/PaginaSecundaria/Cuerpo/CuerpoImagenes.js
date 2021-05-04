import React from 'react'
import add from '../../../imagenes/add.png'
import imagenes from '../../../imagenes/imagenes.jpg'
import cajaFuerte from '../../../imagenes/cajaFuerte.png'
import Popup from '../../PopUp/Popup.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import ArrayList from '../../Desplegable/ArrayList.js'
import ArrayListJerarquia from '../../Desplegable/ArrayListJerarquia.js'
import axios from 'axios';
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

const validate = values =>{
  const errors = {}

  if (!values.nombreImg){
    errors.nombreImg = 'Introduzca nombre válido'
  }
  if (!values.expiracionImg || !/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9][0-9][0-9]/.test(values.expiracionImg)||!compararFechas(values.creacionImg,values.expiracionImg) || !verificarFecha(values.expiracionImg)){
    errors.expiracionImg = 'Introduzca fecha válida'
  }
  return errors
}

function compararFechas(fecha1,fecha2){

  var fechaAct = Number(fecha1.split("-").reverse().join("-").replace(/-/g,""));
  var fechaCad = Number(fecha2.split("-").reverse().join("-").replace(/-/g,""));
  
  return fechaAct < fechaCad;

}
class CuerpoImagenes extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
      showPopup:false,
      nombreImg:'',
      errors: {},
      creacionImg:fecha(),
      expiracionImg:'',
      cargaContenido:true,
      token: localStorage.getItem('token'),
      listadoCategorias:[],
      categoria:'categoriaPrueba',
      vacio:true,
    }
    this.subirImagen=this.subirImagen.bind(this);
    this.data = new FormData();
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

  sendImg=async(value1,value2)=>{
    
    const headers = {'Authorization':`Bearer ${value1}`};
    await axios.post('https://fresh-techh.herokuapp.com/addPic',value2,{headers}
    )
    .then(response =>{
      console.log(response.data);
      this.setState({cargaContenido:false});
      /*this.data.delete('image');
      this.data.delete('nombre');
      this.data.delete('categoria');
      this.data.delete('fechacreacion');
      this.data.delete('fechacaducidad');*/
    })
  }


  eliminarImg=async(value1,value2)=>{
    console.log("ENTRAAA4");
    await axios.delete('https://fresh-techh.herokuapp.com/deletePic',
    
    {headers: {'Authorization':`Bearer ${value1}`}, data:{nombre:`${value2}`}},
  )
  
    .then(response =>{
      console.log(response.data);
    
    })
   
    .catch(error=>{
      console.log(error.response.data);
     
    })
    .catch(error=>{
      console.log(error.response.data);
     
    })
  }


  eliminar=e=>{
    console.log("ENTRAAA3");
    this.eliminarImg(this.state.token,"prueba11");
  }
  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
   
  }
  subirImagen(e){
    let img = e.target.files[0];
    console.log("imagen: ",img);

    if (img) {
      //let data = new FormData();
      this.data.set('image', img);
      
      //VERIFICO QUE TYPE ES IMAGEN (PNG O JPG), SINO ERROR
      //axios.post('/files', data)...
      //this.sendImg(this.state.token,data);
    }else{
      alert("Selecciona una imagen")
    }
  }
  enviarImg(e){

    console.log('nombre', this.state.nombreImg);
    console.log('fechacaducidad', this.state.expiracionImg);
    this.data.set('nombre', this.state.nombreImg);
    this.data.set('categoria', this.state.categoria);
    this.data.set('fechacreacion', this.state.creacionImg);
    this.data.set('fechacaducidad', this.state.expiracionImg);
    this.sendImg(this.state.token,this.data);

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
      this.enviarImg();
    }else{

      console.log('Formulario inválido')
    }
  }
  miListaC={
    listaC:["sin categorias disponibles"]
   }
  render () {
    const { errors,token,cargaContenido} = this.state
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
          {/*<pre><table className="tablaImagenes">
           <tbody>
            <tr>
              <td>
                <img className="imagenesDePrueba" src={imagenes}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              <td>
                <img className="imagenesDePrueba" src={imagenes}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              <td>
                <img className="imagenesDePrueba" src={imagenes}/>
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
            text='Selecciona las imagenes:'
            cuerpo={
              <>
               <form className="pup" onSubmit={this.handleSubmit}>
                <span className="par">
                  <input classname="form-control" type="file" name="image" multiple onChange={this.subirImagen}/>
                  
                  <pre>      </pre>
                  <ArrayList tipo={true} valores={this.miListaC.listaC}/>
                 
                  </span>

                <div className="input-field">
                  <i className="material-icons prefix">assignment</i>
                  <input type="text" name="nombreImg"id="nombreImg" onChange={this.handleChange} placeholder="Nombre"/>
                  {errors.nombreImg && <p className="warning">{errors.nombreImg}</p>}
                </div>
             
                <div className="input-field">
                  <i className="material-icons prefix">event_available</i>
                  <input className="fechaActual" type="date" name="creacionImg"id="creacionImg" value={"Fecha de creacion: " +this.state.creacionImg} onChange={this.handleChange}/>
                  {errors.creacionImg && <p className="warning">{errors.creacionImg}</p>}
                </div>

                <div className="input-field">
                  <i className="material-icons prefix">event_busy</i>
                  <input type="date" name="expiracionImg"id="expiracionImg" placeholder={"Fecha de caducidad: DD-MM-YYYY"} onChange={this.handleChange}/>
                  {errors.expiracionImg && <p className="warning">{errors.expiracionImg}</p>}
                </div>

              
{/*
                <label htmlFor="nombreImg"><pre>Nombre               </pre></label>
                  <input type="text" name="nombreImg"id="nombreImg" onChange={this.handleChange}/>
                  {errors.nombreImg && <p className="warning">{errors.nombreImg}</p>}

                <br/>
                <label htmlFor="creacionImg"><pre>Fecha de creación    </pre></label>
                  <input type="date" name="creacionImg"id="creacionImg" value={this.state.creacionImg} onChange={this.handleChange}/>
                  {errors.creacionImg && <p className="warning">{errors.creacionImg}</p>}

                <br/>
                <label htmlFor="expiracionImg"><pre>Fecha de expiración  </pre></label>
                  <input type="date" name="expiracionImg"id="expiracionImg" placeholder={"DD-MM-YYYY"} onChange={this.handleChange}/>
                  {errors.expiracionImg && <p className="warning">{errors.expiracionImg}</p>}

*/}              
           
               
                <br/>
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

export default CuerpoImagenes

