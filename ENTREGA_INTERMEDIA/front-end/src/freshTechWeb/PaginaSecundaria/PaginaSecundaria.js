import React from 'react'
import CopyR from '../Footer/CopyR'
import Cabecera2 from './Cabecera/Cabecera2'

import CuerpoContraseña from './Cuerpo/CuerpoContraseña.js'
import CuerpoDocumentos from './Cuerpo/CuerpoDocumentos.js'
import CuerpoImagenes from './Cuerpo/CuerpoImagenes.js'
import CuerpoAdministracion from './Cuerpo/CuerpoAdministracion.js'
import CuerpoCategorias from './Cuerpo/CuerpoCategorias.js'
import Cuerpo2 from './Cuerpo/Cuerpo2.js'
import CuerpoSeguridad from './Cuerpo/CuerpoSeguridad.js'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'


class PaginaSecundaria extends React.Component {
  constructor (props) {
      super(props)
  }

  render () {
    return (
      <React.Fragment> 
        <Cabecera2/>
     
        <Switch>
          <Route path="/paginaSecundaria/" exact component={Cuerpo2} />
          <Route path="/paginaSecundaria/seguridad" component={CuerpoSeguridad} />
          <Route path="/paginaSecundaria/contraseñas" component={CuerpoContraseña} />
          <Route path="/paginaSecundaria/documentos" component={CuerpoDocumentos} />
          <Route path="/paginaSecundaria/imagenes" component={CuerpoImagenes} />
          <Route path="/paginaSecundaria/administracion" component={CuerpoAdministracion} />
          <Route path="/paginaSecundaria/categorias" component={CuerpoCategorias} />
        </Switch>
        <CopyR>© 2021 Fetch Tech. Todos los derechos reservados. Marca comercial.</CopyR>
       </React.Fragment>

      )
  }
}

export default PaginaSecundaria