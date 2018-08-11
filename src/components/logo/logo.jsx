import React,{Component} from 'react';
import logo from './images/logo.png'
import './images/image.less';
export default class Logo extends Component{

  render(){
    return(
      <div className='logo-container'>
        <img src={logo} alt="logo" className='logo-img'/>
      </div>

    )
  }
}


