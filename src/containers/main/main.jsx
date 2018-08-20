import React ,{Component}from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile'
import {Switch,Route,Redirect} from 'react-router-dom'
import GodInOf from '../god-info/god-info';
import BossInOf from '../boss-info/boss-info'
import Cookies from 'js-cookie'

import Boss from '../boss/boss'
import God from '../god/god'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'
import NavFooter from '../../components/nav-footer/nav-footer'
import NotFound from '../../components/not-found/not-found'

import {getRedirectPath} from '../../utils'
import {getUser} from '../../redux/actions'
 class Main extends Component{

   navList = [
     {
       path: '/boss', // 路由路径
       component: Boss,
       title: '大神列表',
       icon: 'god',
       text: '大神',
     },
     {
       path: '/god', // 路由路径
       component: God,
       title: '老板列表',
       icon: 'boss',
       text: '老板',
     },
     {
       path: '/message', // 路由路径
       component: Message,
       title: '消息列表',
       icon: 'message',
       text: '消息',
     },
     {
       path: '/personal', // 路由路径
       component: Personal,
       title: '用户中心',
       icon: 'personal',
       text: '个人',
     }
   ]


  componentDidMount(){
    const userid=Cookies.get('userid');
    const {user}=this.props;
    if(userid && !user._id){
      this.props.getUser();


    }


  }

  render(){
    const userid=Cookies.get('userid');
    if(!userid){
      return <Redirect to='/login'/>
    }
    const {user}=this.props;
    if(!user._id){
      return <div>LODING...</div>
    }
    const path=this.props.location.pathname;
    if(path==='/'){

      return <Redirect to={getRedirectPath(user.type,user.header)}/>

    }
    if(user.type==='boss'){
      if(path==='/god'){
        return <Redirect to='/boss'/>
      }
      this.navList[1].hide=true;
    }else {
      if(path==='/boss'){
        return <Redirect to='/god'/>
      }
      this.navList[0].hide=true;
    }



    const currentNav=this.navList.find((nav,index)=>nav.path===path)

    return(
        <div>
          {currentNav ? <NavBar className='fix-top'>{currentNav.title}</NavBar> : null}

          <Switch>
            <Route path='/godinfo' component={GodInOf}/>
            <Route path='/bossinfo' component={BossInOf}/>
            <Route path='/boss' component={Boss}/>
            <Route path='/god' component={God}/>
            <Route path='/message' component={Message}/>
            <Route path='/personal' component={Personal}/>
            <Route path='/chat/:userid' component={Chat}/>

            <Route  component={NotFound}/>

          </Switch>
          {currentNav?<NavFooter navList={this.navList} unReadCount={this.props.unReadCount}/>:null}

        </div>
      )

  }
}
export default connect(
  state=>({user:state.user,unReadCount:state.chat.unReadCount}),
  {getUser}
)(Main)
