import React,{Component} from 'react';
import {Grid,List} from 'antd-mobile';
import PropTypes from 'prop-types'

class HeaderSelector extends Component {
  static propTypes={
    setHeader:PropTypes.func.isRequired

  }
  state={
    icon:null,
  }

  selectHeader=({icon,text})=>{
    this.setState({icon})
    this.props.setHeader(text)

  }

   constructor(props){
    super(props)
     this.headerList=[];
     for(var i=0;i<20;i++){
      const text=`头像${i+1}`;
      const icon=require(`../../assets/img/${text}.png`);
      this.headerList.push({icon,text})
    }

   }


  render() {
    const {icon}=this.state;
    const head=icon ? <div>已选择头像：<img src={icon}/></div> : '请选择头像'
    return (
     <List renderHeader={()=>head}>
       <Grid data={this.headerList}
            onClick={this.selectHeader}
         columnNum={5}/>

     </List>
    )

  }
}
export default HeaderSelector;
