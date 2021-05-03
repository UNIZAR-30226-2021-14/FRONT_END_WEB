import React from 'react'
import PropTypes from 'prop-types'

function seleccionada(valor){

}

class ArrayList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
     asc:true,
     desc:false,
     tipo:this.props.tipo,

      
    };
}

handleChange= ({target}) => {

  if(target.value != "sin categorias disponibles"){
    localStorage.setItem('categoria', target.value);
 
  }else{
    localStorage.setItem('categoria', null);

  }
  
}

handleChange1 = ({target}) => {
  
  this.setState({asc:true,desc:false});
  localStorage.setItem('ordenarDe', "ASC");

}
handleChange2 = ({target}) => {
  
  this.setState({desc:true,asc:false});
  localStorage.setItem('ordenarDe', "DSC");

}
handleSubmit =e => {

  if (!this.state.tipo){
    localStorage.setItem('ordenarPor', this.state.valor);
    
  }else{
    if(this.state.valor != "sin categorias disponibles"){
      localStorage.setItem('categoria', this.state.valor);
      
    }else{
      localStorage.setItem('categoria', null);
     
    }
    
  }
  
}

  render()
  {
    
    return(
     
      <form onSubmit={this.handleSubmit}>
        <pre><div className="array">
          <select onChange={this.handleChange}>
            {this.props.valores.map(data=>(
              <option key={data}>{data}</option>
            ))}
          </select>
        
          {!this.state.tipo ?
            <>
              <pre>    </pre>
              <div>
                <span className="input">
                  <input  id="input1" name="radio" type="radio" defaultChecked={this.state.asc ? true:false} onChange={this.handleChange1}/> <pre className="orden"> Ascendente</pre>
                </span>
            
                <span className="input">
                  <input  id="input2" name="radio" type="radio" defaultChecked={this.state.desc ? true:false} onChange={this.handleChange2}/> <pre className="orden"> Descendente</pre>
                </span>
              </div>
              <label>   </label>
              <input type="submit" value="Send"/>
            </>
            :null
          }
          
          
        </div></pre>
        
      </form>
    );
  }
}
ArrayList.propTypes = {
  
  tipo:PropTypes.bool.isRequired,
  valores:PropTypes.array.isRequired,
  
}
export default ArrayList