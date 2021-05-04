import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'

class Lista extends React.Component {
    constructor(props){
        super(props)
    
    }
    render () {
        
        return (
          <>
          
          <br></br>
           <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
           
           <ul className="collection with-header">
            <li class="collection-header"><h4><strong>Contraseñas caducadas</strong></h4></li>
            
            <li class="collection-item avatar">
              <div>
                <i class="material-icons circle red">picture_as_pdf</i>
                  <span class="title">Title</span>
                  <p>First Line <br></br>
                    Second Line
                  </p>
                <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
              </div>
            </li>
            <li class="collection-item avatar">
            <div>
                <i class="material-icons circle blue">lock_open</i>
                <span class="title">Title</span>
                <p>First Line <br></br>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
              </div>
            </li>
            <li class="collection-item avatar">
            <div>
                <i class="material-icons circle green">image</i>
                <span class="title">Title</span>
                <p>First Line <br></br>
                  Second Line
                </p>
                <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
              </div>
            </li>

           
          </ul>

    
         </>
        )
      }

}

export default Lista



