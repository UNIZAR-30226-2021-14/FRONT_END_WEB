import React, {useState} from 'react'
import add from '../../../imagenes/add.png'
import cajaFuerte from '../../../imagenes/cajaFuerte.png'
import Popup from '../../PopUp/Popup.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ArrayListJerarquia from '../../Desplegable/ArrayListJerarquia.js'
import ArrayList from '../../Desplegable/ArrayList.js'
import ArrayListFile from '../../Desplegable/ArrayListFile.js'
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
      showPopup1:false,
      nombreDoc:'',
      errors: {},
      creacionDoc:fecha(),
      expiracionDoc:'',
      cargaContenido:true,
      token: localStorage.getItem('token'),
      listadoCategorias:[],
      categoria:'categoriaPrueba',
      ordenarPor:localStorage.getItem('ordenarPor'),
      ordenarDe:localStorage.getItem('ordenarDe'),
      listadoDoc:[],
      vacio:true,
      cargando:true,
    
    }
    this.fileEdit={
      nombre:'',
      url:'',
      caducidad:'',
      activacion:'',
      categoria:'',

    }
    this.data = new FormData();
    this.subirArchivos=this.subirArchivos.bind(this);
  }
  miListaV={
    listaV:["Nombre","Fecha de creación", "Fecha de caducidad"]
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
   acortarNombre=e =>{
    var nombre = e.currentTarget.id;
    var resultado = "";
    if(nombre.length > 10){
      for (var i = 0; i < 7; i++){
        resultado[i] = nombre[i];
      }
      resultado = resultado + "...";
      
    }else{
      resultado = nombre;
    }
      console.log("RES: ",resultado);
      return resultado;
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
  sendFile=async(value1,value2)=>{
    
    const headers = {'Authorization':`Bearer ${value1}`};
    await axios.post('https://fresh-techh.herokuapp.com/addFile',value2,{headers}
    )
    .then(response =>{
      console.log("FICHERO SUBIDO: ",response.data);
      this.setState({cargaContenido:true},() => this.togglePopup());
    })
  }

  enviarFile(e){
    this.data.set('nombre', this.state.nombreDoc);
    this.data.set('categoria', this.state.categoria);
    this.data.set('fechacreacion', this.state.creacionDoc);
    this.data.set('fechacaducidad', this.state.expiracionDoc);
    this.sendFile(this.state.token,this.data);

  }
  selectFicheros=async(value)=>{
    var lista = [];
    var indice = 0;
    var orden = '';
    var ordenarde ='';
    console.log("OrdenarPor: ", this.state.ordenarPor);
    console.log("Ordenar de: ", this.state.ordenarDe);
    if(this.state.ordenarPor == "Nombre"){
      orden = "nombre";
    }else if(this.state.ordenarPor == "Fecha de creación"){
      orden = "fechacreacion";
    }else if(this.state.ordenarPor == "undefined"){
      orden = "nombre";
    }else if(this.state.ordenarPor == null || this.state.ordenarPor == "null"){
      orden = "nombre";

    }else{
      orden = "fechacaducidad";
    }
    if(this.state.ordenarDe == null){
      ordenarde = "ASC";
    }else{
      ordenarde = this.state.ordenarDe;
    }
    console.log("OrdenarPor: ", orden);
    console.log("Ordenar de: ", ordenarde);

    const config = {
      headers: {'Authorization':`Bearer ${value}`},
      params:{ordenarPor:orden,ordenarDe:ordenarde}
    }
    await axios.get('https://fresh-techh.herokuapp.com/passwdUser',config
    )
    .then(response =>{
      console.log("RespuestaSelectFile: ", response.data);
      
      for(var i=0; i < response.data.length;i++){
       if(response.data[i].tipo == "file"){
         
         lista[indice] = response.data[i];
         indice = indice + 1;
       }
      }
      if(lista.length == 0){
        this.setState({vacio:true});
      }else{
        this.setState({vacio:false});
      }
      
        this.setState({listadoDoc:lista,cargaContenido:false,cargando:false});
    })
  }
  selectFileDetails=async(value1,value2)=>{

    await axios.get('https://fresh-techh.herokuapp.com/getFile',{params:{nombre:`${value1}`},headers:{'Authorization':`Bearer ${value2}`}}
    )
    .then(response =>{
      console.log("Edit file: ", response.data);
      
      this.fileEdit.activacion=response.data.fechacreacion;
      this.fileEdit.caducidad=response.data.fechacaducidad;
      this.fileEdit.url=response.data.nombreImagen;
      this.fileEdit.categoria=response.data.categoria;
      this.fileEdit.nombre=value1;

      this.togglePopup1();

    })
    .catch(error=>{
      
      console.log("error");
    })
  }

  edit =e =>{
    e.preventDefault();
    console.log(e.target.id);
    var file = e.target.id;
    this.selectFileDetails(file, this.state.token);
  }

  descargar=async(value)=>{
    axios({
      url: value,
      method:"GET",
      responseType:"arraybuffer",
      headers: {
        'Content-Type': 'audio/mpeg'
      }
    })
    .then(responseDownload =>{
      const url = window.URL.createObjectURL(new Blob([responseDownload.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download",value);
      document.body.appendChild(link);
      link.click();
    })
  .catch(error=> {
    console.log(error.message);
  })

  }
  download =e =>{
    e.preventDefault();
    var nombre = e.currentTarget.id;
    this.descargar("https://fresh-techh.herokuapp.com/"+nombre+".pdf");
    
  }
  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
   
  }
  subirArchivos(e){
    let file = e.target.files[0];
    console.log(file);
    if (file) {
      this.data.append('file', file);
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
  togglePopup1() {
    this.setState({
      showPopup1: !this.state.showPopup1
    });
   
  }
  handleSubmit =e => {
    e.preventDefault()
    const {errors, ...sinErrors} = this.state
    const result = validate(sinErrors)
    this.setState({errors:result})
  
    if(!Object.keys(result).length){ //Si tiene propiedades, hay error
      //Envio formulario
      console.log('Formulario válido')
      this.enviarFile();
    }else{

      console.log('Formulario inválido')
    }
  }
 

  render () {
    const {errors,cargaContenido,token} = this.state
    {cargaContenido && this.selectFicheros(token)}
    {cargaContenido && this.selectCategorias(token)}
    return ( 
        <> 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
     
        {/*<div className="filtro2">
          <ArrayListJerarquia />
        </div>*/}
      <div className="Filtro">
        <br></br><br></br>
        <div className="bloqueArray">
          <div className="filtro">
            <ArrayList tipo={false} valores={this.miListaV.listaV} contenido={"ficheros"}/>
          </div>
        </div>
      </div>
      <br></br><br></br>

  <br></br><br></br>   
  {this.state.cargando ?
     <div className="preloader">
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      </div>
    :
    <>
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
        <ul className="collection col">
        <li className="collection-header ml-4"><h4><strong>Documentos</strong></h4></li>
        {this.state.listadoDoc.map(data=>(
          <li key={data.nombre} className="collection-item avatar">
            <i className="material-icons circle red">picture_as_pdf</i>
            <div className="contenidoList">
              
              <p id={data.nombre} className="nombreItem">{data.nombre}</p>
              
              <p className="fechas">{data.fechacreacion}<br></br>
                  {data.fechacaducidad}
              </p>
              <div className="botonesEditDel">
                <input className="btn btn-primary" name={data.nombre} id={data.nombre} type='button' value='Editar'  onClick={this.edit}/>
                <input className="btn btn-primary ml-2" name={data.nombre} id={data.nombre} type='button' value='Eliminar' onClick={this.eliminar}/>
                <input className="btn btn-primary ml-2" name={data.nombre} id={data.nombre} type='button' value='Descargar' onClick={this.download}/>
              </div>
            </div>
          </li>
        ))} 
      </ul>
        }
        

    </>
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
              
                  <input type="file" name="files" accept="application/pdf" onChange={this.subirArchivos}/>
                  
                  <pre>      </pre>
                  <ArrayList tipo={true} valores={this.miListaC.listaC}/>
                </span>
                <br></br>
             
 
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
                  <input type="date" className="fechaActual" name="creacionDoc"id="creacionDoc" value={"Fecha de creación: "+ this.state.creacionDoc} onChange={this.handleChange} readonly="readonly"/>
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
        {this.state.showPopup1 ? 
        
        <Popup
          text='Edita el fichero:'
          cuerpo={
            <>
     
            <form className="pup" onSubmit={this.handleSubmitEdit}>

             
              <span className="par">
            
                <input type="file" name="files" accept="application/pdf" onChange={this.subirArchivos}/>
                
                <pre>      </pre>
                <ArrayList tipo={true} valores={this.miListaC.listaC}/>
              </span>
              <br></br>
              
              <div className="input-field">
                <i className="material-icons prefix">assignment</i>
                <input type="text" name="nombreDoc"id="nombreDoc" onChange={this.handleChange} placeholder="Nombre" defaultValue={this.fileEdit.nombre}/>
                {errors.nombreDoc && <p className="warning">{errors.nombreDoc}</p>}
              </div>
           
              <div className="input-field">
                <i className="material-icons prefix">event_available</i>
                <input type="date" className="fechaActual" name="creacionDoc"id="creacionDoc" value={"Fecha de creación: "+ this.fileEdit.activacion} onChange={this.handleChange} readonly="readonly"/>
              </div>

              <div className="input-field">
                <i className="material-icons prefix">event_busy</i>
                <input type="date" name="expiracionDoc"id="expiracionDoc" placeholder={"Fecha de caducidad: DD-MM-YYYY"} onChange={this.handleChange} defaultValue={this.fileEdit.caducidad}/>
                
                {errors.expiracionDoc && <p className="warning">{errors.expiracionDoc}</p>}
              </div>

              <br></br>
              <input type='submit' className="btn btn-primary mr-2" value='Subir'/>
              <input type='button' className="btn btn-primary" value='Cerrar' onClick={this.togglePopup1.bind(this)}/>
            </form>
            
            </>
          }         
          eliminada={false}

        />
        
        : null
      }
       
      </>
      
    )
  }


}

export default CuerpoDocumentos