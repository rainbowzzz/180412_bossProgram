import {combineReducers} from 'redux';
import {getRedirectPath} from '../utils/index';
import {AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from './action-type'


const initUser={
  username:'',
  type:'',
  msg:'',
  redirectTo:''
}


function user(state=initUser,action) {
  switch (action.type){
    case AUTH_SUCCESS:
      const user=action.data
      return {...user,redirectTo:getRedirectPath(user.type,user.header)};
    case ERROR_MSG:
      const msg=action.data;
      return {...state,msg};
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return{...initUser,msg:action.data}
    default:
      return state;
  }
}


const initUserList=[]
function userList(state=initUserList,action) {
  switch (action.type){
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }

}

const initChat={
  users:{},
  chatMsgs:[],
  unReadCount:0
}
function chat(state=initChat,action) {
  switch (action.type){
    case RECEIVE_MSG_LIST:
      var {users,chatMsgs,meId}=action.data;
      return {
        users,
        chatMsgs,
        unReadCount:chatMsgs.reduce((preTotal,msg)=>preTotal+(!msg.read&&msg.to===meId?1:0),0)
           }
    case RECEIVE_MSG:
      var {chatMsg,meId}=action.data;
     // console.log(chatMsg,action.data)
    /*  return{
        users:state.users,
        chatMsgs:[...state.chatMsgs,chatMsg],
        unReadCount:state.unReadCount+(!chatMsgs.read&&chatMsgs.to===meId?1:0)
      }*/
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===meId ? 1 : 0),
      }
    case MSG_READ:
      var {count,targetId,meId}=action.data;
      console.log(count)
      return {
        users: state.users,
        // 将哪些msg的read从false变为true
        chatMsgs: state.chatMsgs.map(msg => {
          if(msg.from===targetId && msg.to===meId && !msg.read) {
            console.log(1111)
            return {...msg, read: true}
          } else {
            return msg
          }
        }),
        unReadCount: state.unReadCount - count,
      }
     /* return{
        users:state.users,
        chatMsgs:state.chatMsgs.map(msg=>{
          if(msg.from===targetId && msg .to===meId && !msg.read){
            return{...msg,read:true}
          }else {
            return msg
          }
        }),
        unReadCount:state.unReadCount-count
      }*/

    default:
      return state;
  }
}




export default combineReducers({
  user,
  userList,
  chat
})