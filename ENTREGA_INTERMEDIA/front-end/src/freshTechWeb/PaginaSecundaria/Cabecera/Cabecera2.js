import React from 'react'
import logo from '../../../imagenes/logo.jpg'
import {Link} from  'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from  'reactstrap'

class Cabecera2 extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          open: false,
        };
    }

    abrirCerrarDD = (e) => {
      this.setState({open: !this.state.open})
    }

   
    render () {
        return (
            <table className="cabecera">
              <tbody>
                <tr>
                  <td><Link to="/paginaSecundaria">
                    <img className="logoEmpresa" src={logo} alt="Logo"/>
                  </Link></td>
                  <td>
                  <>
                    <Dropdown isOpen={this.state.open} toggle={this.abrirCerrarDD}>
                      <DropdownToggle className="drop">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                        <span className="desplegable"><i className="fa fa-navicon"></i></span>
                        </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem><Link to="/paginaSecundaria/administracion" className="opt">Administrar Cuenta</Link></DropdownItem>
                        <DropdownItem><Link to="/paginaSecundaria/categorias" className="opt">Administrar Categorías</Link></DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    
                    </>
                  </td>
                  <td><Link to="/paginaSecundaria/seguridad">
                    <button className="seguridad">Seguridad</button>
                  </Link></td>
                  <td><Link to="/paginaSecundaria/contraseñas">
                    <button className="contraseñas">Contraseñas</button>
                  </Link></td>
                  <td><Link to="/paginaSecundaria/documentos">
                    <button className="documentos">Documentos</button>
                  </Link></td>
                  <td><Link to="/paginaSecundaria/imagenes">
                    <button className="imagenes">Imagenes</button>
                  </Link></td>
                </tr>
              </tbody>
              
            </table>
        );
    }
}
export default Cabecera2