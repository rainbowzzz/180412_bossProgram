import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import HeaderSelector from '../../components/header-selector/header-selector'
import {NavBar, List, WingBlank,Button, InputItem, TextareaItem} from 'antd-mobile'

import {updateUser} from '../../redux/actions'



class BossInfo extends Component{
  state = {
    header: '', // 头像名称
    info: '', // 职位简介
    post: '', // 职位名称
    company: '', // 公司名称
    salary: '' // 工资
  }
  handleChange = (name, val) => {
    this.setState({[name]: val})
  }
  setHeader=(header)=>{
      this.setState({header})
  }
  save=()=>{
    this.props.updateUser(this.state)

  }


  render(){
    const {header}=this.props.user;

    if(header){
      return <Redirect to='/boss'/>
    }
    return(
      <div>
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <WingBlank>
          <List>
            <InputItem onChange={val=>{this.handleChange('post',val)}}>招聘职位：</InputItem>
            <InputItem onChange={val=>{this.handleChange('company',val)}}>公司名称：</InputItem>
            <InputItem onChange={val=>{this.handleChange('salary',val)}}>职位薪资：</InputItem>
            <TextareaItem title='职位要求'
            row={3}
           onChange={val => this.handleChange('info', val)}/>
            <Button type='primary' onClick={this.save}>保存</Button>
          </List>
        </WingBlank>


      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {updateUser}
)(BossInfo)