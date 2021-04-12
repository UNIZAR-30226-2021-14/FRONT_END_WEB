import React from 'react'

class ArrayList extends React.Component {

  miLista={
   lista:["Nombre","Fecha de creación", "Fecha de caducidad", "Categoria"]
  }
  render()
  {
    return(
      <div>
        <select>
          {this.miLista.lista.map(data=>(
            <option>{data}</option>
          ))}
        </select>

      </div>

    );
  }
}
export default ArrayList