import io from 'socket.io-client';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ

} from './action-type';

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqMsgList,
  reqReadMsg
} from '../api';




const errorMsg=(msg)=>({type:ERROR_MSG,data:msg});
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user});
const receiveUser=(user)=>({type:RECEIVE_USER,data:user});
export const resetUser=(msg)=>({type:RESET_USER,data:msg});
const receiveUserList=(userList)=>({type:RECEIVE_USER_LIST,data:userList});
const receiveMsgList=({users,chatMsgs,meId})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,meId}});
const receiveMsg=(chatMsg,meId)=>({type:RECEIVE_MSG,data:{chatMsg,meId}});
const msgRead=({count,targetId, meId})=>({type:MSG_READ,data:{count, targetId, meId}})








//注册
export function register({username,password,password2,type}) {
  if(!username){
    return errorMsg('用户名必须填写')
  }else if(!password){
    return errorMsg('密码必须填写')
  }else if(password2!==password){
    return errorMsg('输入两次密码不一致')
  }
  return async dispatch =>{
    const response=await reqRegister({username,password,type})
    const result=response.data;
    if(result.code===0){
      const user=result.data;
      getChatMsgs(dispatch,user._id);
      dispatch(authSuccess(user))
    }else {
      const msg=result.msg;
      dispatch(errorMsg(msg));
    }

  }
}


//登录
export function login({username,password}) {

  return async dispatch =>{
    if(!username){
      return dispatch (errorMsg('用户名必须填写'))
    }else if(!password){
      return dispatch(errorMsg('密码必须填写'))
    }

    const response=await reqLogin(username,password)
    const result=response.data;
    if(result.code===0){
      const user=result.data;
      getChatMsgs(dispatch,user._id);
      dispatch(authSuccess(user))
    }else {
      const msg=result.msg;
      dispatch(errorMsg(msg));
    }

  }
}


//完善用户信息

export function updateUser(user) {
  return async dispatch=>{
    const response=await reqUpdateUser(user);
    const result=response.data;
    if(result.code===0){
      dispatch(receiveUser(result.data))

    }else {
      dispatch(resetUser(result.msg))

    }

  }
}
//获取用户信息
export  function getUser(user) {
  return async dispatch=>{
    const response=await reqUser(user);
    const result=response.data;
    if(result.code===0){
      const user=result.data;
      getChatMsgs(dispatch,user._id);
      dispatch(receiveUser(user))

    }else {
      dispatch(resetUser(result.msg))

    }

  }
}


export function getUserList(type) {
  return async dispatch=>{
    const response=await reqUserList(type);
    const result=response.data;
    if(result.code===0){
      const userList=result.data;
      dispatch(receiveUserList(userList))
    }
  }
}

//发消息的异步action







function initSocketIO(dispatch,meId) {
  io.meId=meId
  if(!io.socket) {
    io.socket = io('ws://localhost:4000');
    io.socket.on('receiveMsg', (chatMsg) => {
      console.log('浏览器接收到服务发送的消息', chatMsg);

      if(chatMsg.from===io.meId || chatMsg.to===io.meId) {// 与保存的最新meId进行比较
        dispatch(receiveMsg(chatMsg,io.meId))
      }
    })
  }


}


export function sendMsg({content,from,to}) {
  return dispatch => {
    io.socket.emit('sendMsg', {content, from, to});
    console.log('浏览器向服务器发送消息', {content, from, to});

  }
}

async function getChatMsgs(dispatch,meId) {
  initSocketIO(dispatch,meId);
  const response=await reqMsgList();
  const result=response.data;
  if(result.code===0){
    const {users,chatMsgs}=result.data
    dispatch(receiveMsgList({users,chatMsgs,meId}))
  }
}

export function  readMsg(targetId,meId){
  return async dispatch=>{
    const response=await reqReadMsg(targetId);
    const result=response.data;
    if(result.code===0){
      const count=result.data;
      dispatch(msgRead({count,targetId,meId}))
    }
  }

}
