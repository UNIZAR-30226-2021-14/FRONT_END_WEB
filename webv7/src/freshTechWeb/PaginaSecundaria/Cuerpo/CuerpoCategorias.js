import React from 'react'
import vacia from '../../../imagenes/vacia.png'
import ArrayListJerarquia from '../../Desplegable/ArrayListJerarquia.js'
import categorias from '../../../imagenes/categorias.png'
import Popup from '../../PopUp/Popup.js'
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css'

const validate = values =>{
  const errors = {}

  if (!values.categoria){
    errors.categoria = 'Introduzca una categoría valida'
  }
  
  return errors
}
class CuerpoCategorias extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      categoria:'',
      showPopup:false,
      errors: {},
      token: localStorage.getItem('token'),
      cargaContenido:true,
      listadoCategorias:[],
      vacio:true,
   
    }
  
    
  }

  crearCategoria=async(value)=>{
    console.log("ENTRA CAT: ",value);
    const body = {nombrecategoria:this.state.categoria};
    const headers = {'Authorization':`Bearer ${value}`};
    await axios.post('https://fresh-techh.herokuapp.com/addcat',body,{headers}
    )
    .then(response =>{
      console.log(response.data);
      this.setState({cargaContenido:true});
      this.togglePopup();
      
      
     
    })
  
  }

  selectCategorias=async(value)=>{
    console.log("ENTRAAA");
    //const query = {ordenarPor:this.state.ordenarPor,ordenarDe:this.state.ordenarDe};
    //const headers = {'Authorization':`Bearer ${value}`};
    const config = {
      
      headers: {'Authorization':`Bearer ${value}`},
    }
    await axios.get('https://fresh-techh.herokuapp.com/getcat',config
    )
    .then(response =>{
      console.log("esto: ", response.data.length);
      if(response.data.length == 0){
        this.setState({vacio:true});
      }else{
        this.setState({vacio:false});
      }
      this.setState({listadoCategorias:response.data,cargaContenido:false});
    })
  
  }

  deleteCategorias=async(value1,value2)=>{
    console.log("ENTRAAA: ", value1, " -- ", value2);
  
    await axios.delete('https://fresh-techh.herokuapp.com/deletecat',{headers:{'Authorization':`Bearer ${value2}`},data:{nombrecategoria:`${value1}`}}
    )
    .then(response =>{
      console.log(response.data);
      this.setState({cargaContenido:true});
      //window.location.reload(true);
    })
    .catch(error=>{
      console.log(error.response.data);
     
    })
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  handleChange = ({target}) => {
    const{name,value} = target
    this.setState({[name]:value})
   
  }

  handleSubmit =e => {
    e.preventDefault()
    console.log("?????");
    const {errors, ...sinErrors} = this.state
    const result = validate(sinErrors)
    this.setState({errors:result})
    
    if(!Object.keys(result).length){ //Si tiene propiedades, hay error
      //Envio formulario
      this.crearCategoria(this.state.token);
      
      console.log('Formulario válido')
    }else{

      console.log('Formulario inválido')
    }
  }
  delete =e =>{
    e.preventDefault();
    console.log("ELEGIDA: ", e.currentTarget.id);
    var cat = e.currentTarget.id;
    this.deleteCategorias(cat,this.state.token);
    
  }
  render () {
    
    const { errors,token,cargaContenido} = this.state
    {cargaContenido && this.selectCategorias(token)}
    {console.log("carga: ", cargaContenido)}
    return (
      <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <div className="filtro2">
          <ArrayListJerarquia />
      </div>
      {this.state.vacio ?
      <>
        <div className="carpetaVacia">
          <img className="vacia" src={vacia} alt="carpetaVacia" />
        </div>

        <pre><div className="textoImagenCat">
          <p>                    No hay categorías disponibles</p>
        </div></pre>
      </>
      :
      
        <div className="contenido">
          {this.state.listadoCategorias.map(data=>(
          <pre key={data.nombrecat}>
            <label htmlFor={data.nombrecat} className="categoriasGestion">
              <p name={data.nombrecat} id={data.nombrecat}> {data.nombrecat}</p>
              <label>  </label>
              <input type='button' id={data.nombrecat} value='Eliminar' onClick={this.delete}/>
            </label>
          </pre>
          ))}  
        </div>
      }
      <button className="anyadeCategoria" onClick={this.togglePopup.bind(this)}>Añade una!</button>




  
      {/*<pre><table className="tablaCategorias">
           <tbody>
            <tr>
              <td>
                <img className="categoriasDePrueba" src={categorias}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              <td>
                <img className="categoriasDePrueba" src={categorias}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              <td>
                <img className="categoriasDePrueba" src={categorias}/>
                <br></br>
                <input type='button' value='Editar'/>
                <input type='button' value='Eliminar'/>
              </td>
              
            </tr>
           </tbody>
    </table></pre>*/}

      {this.state.showPopup ? 
          <Popup
            text='Selecciona las imagenes:'
            cuerpo={
              <>
              <form className="pup" onSubmit={this.handleSubmit}>
                {/*<label htmlFor="categoria"><pre>Nueva categoria  </pre></label>
                  <input type="text" name="categoria"id="categoria" onChange={this.handleChange}/>*/}
                   <div className="input-field">
                      <i className="material-icons prefix circle">assignment</i>
                      <input type="text" name="categoria"id="categoria" onChange={this.handleChange} placeholder={"Introduzca una categoría nueva"}/>
                      {errors.categoria && <p className="warning">{errors.categoria}</p>}
                    </div>
                  

                <br/>
                <input type='submit' class="btn waves-effect waves-light mr-5" value='Añadir'/>
                <input type='button' class="btn waves-effect waves-light" value='Cancelar' onClick={this.togglePopup.bind(this)}/>
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

export default CuerpoCategorias

