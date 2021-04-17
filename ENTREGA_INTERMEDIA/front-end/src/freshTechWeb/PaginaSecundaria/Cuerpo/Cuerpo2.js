import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import img1 from '../../../imagenes/img1.png'
import img2 from '../../../imagenes/img2.png'
import img3 from '../../../imagenes/img3.png'

class Cuerpo2 extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      gallery:[ 
        <img className="img1" src={img1} alt="img1"/>,
        <img className="img1" src={img2} alt="img1"/>,
        <img className="img1" src={img3} alt="img1"/>,
      ],
      
    }
  }


  render () {
    const { gallery} = this.state
    return (
      <>
   
      <AliceCarousel 
        items={gallery}
        
        autoPlayInterval={2000}
        autoPlayDirection="lft"
        autoPlay={true}
        fadeOutAnimation={true}
        mouseTrackingEnabled={false}
        disableAutoPlayOnAction={true}
        infinite={true}
        disableButtonsControls={true}
      />

    </>
    )
  }
}

export default Cuerpo2
