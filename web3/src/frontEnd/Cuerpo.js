import React from 'react'
import Info from './Info.js'

class Cuerpo extends React.Component {

  constructor(props){
    super(props)
    this.state = {
     
      isFetch: true,
    }
  }


  render () {
    const { isFectch} = this.state
    return (
      <>
      {
        isFectch && 'Loading...' //Si es true entonces muestra loading... Si loading fuera componente se pondría <Loading/> 
      }
      <Info />
    </>
    )
  }
}

export default Cuerpo
