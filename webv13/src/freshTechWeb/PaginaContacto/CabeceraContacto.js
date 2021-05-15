import React from 'react'
import logo from '../../imagenes/logo.jpg'
import {Link} from  'react-router-dom'


import 'materialize-css/dist/css/materialize.min.css'




const contact = { emailDestination:'', code:''};

class Cabecera extends React.Component {
    constructor (props) {
        super(props)
        
    }
    

    
  
    render () {
    
        return (
          <>

            <table className="cabecera">
              <tbody>
                <tr>
                  
                  <td  className="cabeceraContacto"><Link to="/contacto"><img className="logoEmpresa" src={logo} alt="Logo"/></Link></td>
                  <td className="cabeceraContacto"><button className="vueltaAInicio"><Link to="/" className="contactoLink">Volver a inicio</Link></button></td>
                  <td></td>
                </tr>
              </tbody>
              
            </table>

          </>
        )
    }

}

export default Cabecera




