import React from 'react'
import Email from '../Email/Email.js'
class CuerpoContactoInicio extends React.Component {

    constructor(props){
      super(props)
      this.state={
    
        
      };
     
    }
    
    render () {
     
      return (
        <>
        <br></br><br></br><br></br><br></br>
          <div className="contactoTitle">
            <h3 className="title1">Contacte con nosotros</h3>
            <h4 className="title2">freshtechverify@gmail.com</h4>
          </div>
          <Email tipo={true}/>
        </>
      )
    }
  }
  
  export default CuerpoContactoInicio
  