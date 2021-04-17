import React from 'react'
import PropTypes from 'prop-types'





class ArrayListJerarquia extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      si:false,
      valores:["Elija una filtro primero..."],
     };
  }
  miLista ={
    listaVacia:["Elija una filtro primero..."],
    listaN: ["Nombre1","Nombre2", "Nombre3", "Nombre4"],
    listaFA: ["Fecha1","Fecha2", "Fecha3", "Fecha4"],
    listaFC: ["Fecha1","Fecha2", "Fecha3", "Fecha4"],
    listaC:["Categoria1","Categoria 2", "Categoria 3", "Categoria 4"]
   }
  selectFiltro =(e) =>{
    let valor;
    let i = e.target.selectedIndex;
    let val = e.target.options[i].value;
    if (val == 0){
      valor = this.miLista.listaVacia;
    }else if(val == 1){
      valor = this.miLista.listaN;
    }else if(val == 2){
      valor = this.miLista.listaC;
    }else if(val == 3){
      valor = this.miLista.listaFA;
    }else{
      valor = this.miLista.listaFC;
    }
    
    this.setState({opcion:val,valores:valor,si:true},() => console.log(val,this.state.valores,"--",valor));
    
    
  }

   
  opciones(){
    console.log(this.state.valores);
    return <select>
    {this.state.valores.map(data=>(
      <option>{data}</option>
    ))}
  </select>
  }
   
  render()
  {

    return(
     
     <pre><div className="tablaFiltros">
        <table>
           <tbody>
          <tr>
            <td>
              <span className="textoFiltro">Filtro</span>  {   }    
            </td>
            <td>
              <select name="filtros" if="filtros" onChange={this.selectFiltro}>
                <option value="0">Sin filtro...</option>
                <option value="1">Nombre</option>
                <option value="2">Categoria</option>
                <option value="3">Fecha de activacion</option>
                <option value="4">Fecha de caducidad</option>
              </select>
            </td>
          </tr>
         
          <tr>
            <td align="right">
              
            </td>
            <td>
            {this.opciones()}
            </td>
           
          </tr>
          </tbody>
        </table>
      </div></pre>

  
     
    );
  }
}

export default ArrayListJerarquia







