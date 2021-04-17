import React from 'react'
import PropTypes from 'prop-types'

class ArrayList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
     asc:true,
     desc:false,
     tipo:this.props.tipo,
    
    };
}


 handleChange1 = ({target}) => {
  
  this.setState({asc:true,desc:false}, () =>  console.log("ASC: ",this.state.asc, " DESC: ",this.state.desc));


}
handleChange2 = ({target}) => {
  
  this.setState({desc:true,asc:false},() =>  console.log("DESC: ",this.state.desc," ASC: ",this.state.asc));
 

}
  render()
  {
    return(
      
      <div className="array">
        <select>
          {this.props.valores.map(data=>(
            <option>{data}</option>
          ))}
        </select>
        {!this.state.tipo ?
          <>
            <pre>    </pre>
            <div>
              <span className="input">
                <input  id="input1" name="radio" type="radio" defaultChecked onChange={this.handleChange1}/> <pre className="orden"> Ascendente</pre>
              </span>
            
              <span className="input">
                <input  id="input2" name="radio" type="radio" onChange={this.handleChange2}/> <pre className="orden"> Descendente</pre>
              </span>
            </div>
          </>
          :null
        }
      </div>

    );
  }
}
ArrayList.propTypes = {
  
  tipo:PropTypes.bool.isRequired,
  valores:PropTypes.string.isRequired,
  
}
export default ArrayList