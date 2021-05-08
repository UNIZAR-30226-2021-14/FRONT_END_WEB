import React from 'react'
import img1 from '../../../imagenes/img1.png'
import img2 from '../../../imagenes/img2.png'
import img3 from '../../../imagenes/img3.png'



class Info extends React.Component {

  constructor(props){
    super(props)
    this.state = {
     
      search: '',
      input:0,
      
    }
  }
  async componentDidMount (){
    this.setState({search:img1, isFectch : false})
  }
  handleChange1 = (e) => {
    this.setState({search: img1,input:0})
  }
  handleChange2 = (e) => {
    this.setState({search: img2,input:1})
  }
  handleChange3 = (e) => {
    this.setState({search: img3,input:2})
  }
  render () {
    const {search,input} = this.state
    return (
      <>
   
      <br></br>
      
      <div className="cuerpo1">
        <div className="anuncio">
          {input === 0 && 
            <p>La seguridad y privacidad que necesitas</p>
          }
          {input === 1 && 
            <p>Todas tus contraseñas disponibles en un solo click</p>
          }
          {input === 2 && 
            <p>Simple de usar y muy intuitiva</p>
          }
        </div>
        <div className="tercio">          
          <br></br>
          <img className="img1" src={search} alt="img1"/>
          <div className="botones">
            <input  id="input1" name="radio" type="radio" onChange={this.handleChange1} defaultChecked/>
            <input  id="input2" name="radio" type="radio" onChange={this.handleChange2}/>
            <input  id="input3" name="radio" type="radio" onChange={this.handleChange3}/>
          </div>
          
          <br></br><br></br>
          
        </div>
      </div>
     </>
    )
  }
}

export default Info


