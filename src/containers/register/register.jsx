import React ,{Component}from 'react'
import {NavBar,
  List,
  WingBlank,
  WhiteSpace,
  InputItem,
  Radio,
  Button
} from 'antd-mobile';
import Logo from '../../components/logo/logo'


class Register extends Component{

  state={
    username:'',
    password:'',
    password2:'',
    type:'god'
  }

  handleChange = (name,val) =>{
    this.setState({
      [name]:val
    })

  }
  toLogin = () =>{
    this.props.history.replace('./login')
  }

  render(){

    const {type}=this.state
    return(
        <div>
          <NavBar>硅谷直聘</NavBar>
          <Logo/>
          <WingBlank>
            <List>
               <InputItem type='text' placeholder='请输入用户名'
                          onChange={(val)=>this.handleChange('username',val)}>用户名：</InputItem>
               <WhiteSpace/>
               <InputItem type='password'  placeholder='请输入密码'
                          onChange={(val)=>this.handleChange('password',val)}>密&nbsp;  码：</InputItem>
               <WhiteSpace/>
               <InputItem type='password' placeholder='请重新输入密码'
                          onChange={(val)=>this.handleChange('password2',val)}>确认密码：</InputItem>
               <WhiteSpace/>
               <List.Item >
                 <span>用户类型：</span>&nbsp;&nbsp;&nbsp;
                 <Radio  checked={this.state.type==='boss'}
                   onClick={()=>this.handleChange('type','boss')}>老板</Radio>&nbsp;&nbsp;
                 <Radio checked={this.state.type==='boss'}
                   onClick={()=>this.handleChange('type','god')}>大神</Radio>
               </List.Item>
              <WhiteSpace/>
              <Button type='primary'>注 册</Button>
              <WhiteSpace/>
              <Button onClick={this.toLogin}>已有账户</Button>

            </List>
          </WingBlank>
        </div>
      )

  }
}

export default Register;