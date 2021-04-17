import React from 'react'
import Cabecera from './Cabecera/Cabecera'
import Cuerpo from './Cuerpo/Cuerpo'
import CopyR from '../Footer/CopyR'

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