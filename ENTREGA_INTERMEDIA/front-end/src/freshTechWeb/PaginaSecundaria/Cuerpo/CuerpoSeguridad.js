import React from 'react'
import PasswordStrengthMeter from '../../SeguridadContrasenya/PasswordStrengthMeter';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class CuerpoSeguridad extends React.Component {

  constructor(props){
    super(props)
    this.state = {
     
      password:'',
      copied1:false,
      copied2:false,
      contrasenya_avanzado:'',
      longitud:'8',
      tipo:'',
    
    }
  }
  componentDidMount() {
    this.buildPassword();
  }
  generarContrasenyaDebil =e =>{
    this.setState({tipo:"debil"});

  }
  generarContrasenyaMedia =e =>{
    this.setState({tipo:"media"});

  }
  generarContrasenyaFuerte =e =>{
    this.setState({tipo:"fuerte"});

  }

  validarPassword =(value) =>{
      let val1 = false,
          val2=false,
          val3=false;
      for(let i = 0; i < value.length; i++) {
        if(/[0-9]/.test(value.charAt(i))){
          val1=true;
        }
        if(/[a-zA-Z]/.test(value.charAt(i))){
          val2=true;
        }
        if (this.state.tipo == "fuerte"){
          if((/[!@#$%*]/.test(value.charAt(i)))){
            val3=true;
          }
        }else{
          val3=true;
        }
      }
      return val1 && val2 && val3;
  }

  buildPassword = () => {
    let a = "",
        d = "",
        b = "1234567890abcdefghijklmnopqrstuvwxyz!@#$%*",
        c = this.state.longitud,
        valida = false;


    if(this.state.tipo != ''){
      while(!valida){
        for(let ma = 0; ma < c; ma++) {
          let n = 0;
          if (this.state.tipo == "debil"){
            n = Math.floor(Math.random() * 10);
          }else if (this.state.tipo == "media"){
            n = Math.floor(Math.random() * b.length-6);
          }else{
            n = Math.floor(Math.random() * b.length);
          }
          d = b.charAt(n);
          a = a + d;
        }
        if(this.state.tipo == "media" || this.state.tipo == "fuerte"){
          valida=this.validarPassword(a);
          if (!valida){
            a="";
          }
          
        }else{
          valida = true;
        }
      }
      this.setState({contrasenya_avanzado:a});
    }
  }

  setLongitud = ({ value }) => {
    this.setState({longitud:value}, () => { this.buildPassword();});
   
  }
  mensaje(){
    
    return <span style={{color: 'red'}}>Copiado</span>
    
  }


  render () {
    const {password,copied1,copied2,contrasenya_avanzado} = this.state
    return (
      <>
      
      <div className="passwdMeter">
          <br/>
          <strong>Introduzca una contraseña a validar</strong>
          <div className="meter">
            <br/>
            <input autoComplete="off" type="password" onChange={e => this.setState({ password: e.target.value,copied:false})} />
            <CopyToClipboard text={password} onCopy={e => this.setState({ copied1:true})}><button className="copyTC">Copiar</button></CopyToClipboard>
            {copied1 ? this.mensaje(): null}
            <PasswordStrengthMeter password = {password}/>
            <strong>O genere una a su gusto</strong>
            <br/>
            <br/>
            <input autoComplete="off" type="text" onChange={e => this.setState({ contrasenya_avanzado: e.target.value,copied:false})} readOnly="readonly" value={this.state.contrasenya_avanzado}/>
            <CopyToClipboard text={contrasenya_avanzado} onCopy={e => this.setState({ copied2:true})}><button className="copyTC">Copiar</button></CopyToClipboard>
            {copied2 ? this.mensaje() : null}
            <br/>
            <div className="botones">
              <input  id="input1" name="radio" type="radio" onChange={this.generarContrasenyaDebil}/> Numeros <br></br>
              <input  id="input2" name="radio" type="radio" onChange={this.generarContrasenyaMedia}/>  Numeros y letras<br></br>
              <input  id="input3" name="radio" type="radio" onChange={this.generarContrasenyaFuerte}/> Numeros, letras y caracteres especiales<br></br><br></br>
              <pre><input type="range" min="8" max="20"  defaultValue={this.state.longitud} onChange={ e => this.setLongitud(e.target) }/>   {this.state.longitud}</pre>
            </div>
          </div>
      </div>
        
      </>
    )
  }
}

export default CuerpoSeguridad





