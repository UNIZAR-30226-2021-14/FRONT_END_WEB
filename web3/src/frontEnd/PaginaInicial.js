import React from 'react'
import Cabecera from './Cabecera'
import Cuerpo from './Cuerpo'
import CopyR from './CopyR'

class PaginaInicial extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
      return (
        <React.Fragment> 
          <Cabecera/>
          <Cuerpo />
          <CopyR>© 2021 Fetch Tech. Todos los derechos reservados. Marca comercial.</CopyR>
         </React.Fragment>

        )
    }
}
export default PaginaInicial