import React from 'react'
import vacia from '../imagenes/vacia.png'

class CuerpoCategorias extends React.Component {

  constructor(props){
    super(props)
    
  }

  render () {
    
    return (
      <>
      <button className="anyadeCategoria">Añade una!</button>
      <div className="carpetaVacia">
        <img className="vacia" src={vacia} alt="carpetaVacia" />
      </div>

      <pre><div className="textoImagen">
        <p>                    No hay categorías disponibles</p>
      </div></pre>
   </>
    )
  }
}

export default CuerpoCategorias

