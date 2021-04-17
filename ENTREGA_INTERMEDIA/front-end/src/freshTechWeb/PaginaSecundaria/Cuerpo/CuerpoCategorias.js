import React from 'react'
import vacia from '../../../imagenes/vacia.png'
import ArrayListJerarquia from '../../Desplegable/ArrayListJerarquia.js'
import categorias from '../../../imagenes/categorias.png'
import Popup from '../../PopUp/Popup.js'

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
    }
    
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
    const { errors} = this.state
    return (
      <>
      <div className="filtro2">
          <ArrayListJerarquia />
      </div>
      <button className="anyadeCategoria" onClick={this.togglePopup.bind(this)}>Añade una!</button>
      {/*<div className="carpetaVacia">
        <img className="vacia" src={vacia} alt="carpetaVacia" />
      </div>

      <pre><div className="textoImagenCat">
        <p>                    No hay categorías disponibles</p>
      </div></pre>*/}
      <pre><table className="tablaCategorias">
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
      </table></pre>

      {this.state.showPopup ? 
          <Popup
            text='Selecciona las imagenes:'
            cuerpo={
              <>
              <form className="pup" onSubmit={this.handleSubmit}></form>
               <label htmlFor="categoria"><pre>Nueva categoria  </pre></label>
                  <input type="text" name="categoria"id="categoria" onChange={this.handleChange}/>
                  {errors.categoria && <p className="warning">{errors.categoria}</p>}

                <br/>
                <input type='submit' className="Send" value='Añadir'/>
                <input type='button' className="Close" value='Cancelar' onClick={this.togglePopup.bind(this)}/>
              <form/>
              </>
            }
            sendData={<button type="Submit" className="Send" onClick={() => this.postData()}>Send</button>}
            eliminada={false}
          />
          : null
        }

   </>
    )
  }
}

export default CuerpoCategorias

