/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

class Message extends Component {


  getLastMsgs=(chatMsgs,meId)=>{
    const lastMsgObjs={}
    chatMsgs.forEach(msg=>{
      if(!msg.read && msg.to===meId){
        msg.unReadCount=1
      }else {
        msg.unReadCount=0
      }

      const chatId=msg.chat_id;
      const lastMsg=lastMsgObjs[chatId]
      if(!lastMsg){
        lastMsgObjs[chatId]=msg
      }else {
        const unReadCount=msg.unReadCount+lastMsg.unReadCount;
        if(msg.create_time>lastMsg.create_time){
          lastMsgObjs[chatId]=msg
        }
        lastMsgObjs[chatId].unReadCount=unReadCount
      }
    })
    const lastMsgs=Object.values(lastMsgObjs);
    lastMsgs.sort((msg1,msg2)=>{
      return msg2.create_time-msg1.create_time
    })
    return lastMsgs

  }

  render() {
    const {user}=this.props;
    const meId=user._id
    const {users,chatMsgs}=this.props.chat;
    const lastMsgs=this.getLastMsgs(chatMsgs,meId)
    return (
      <List style={{marginTop:50,marginBottom:50}}>
        {
          lastMsgs.map(msg => {

            const targetId=meId===msg.from ?msg.to:msg.from
            const targetUser=users[targetId];
           return(
             <Item
               key={msg._id}
               extra={<Badge text={msg.unReadCount}/>}
               thumb={require(`../../assets/img/头像1.png`)}
               arrow='horizontal'
               onClick={() => this.props.history.push(`/chat/${targetId}`)}
             >
               {msg.content}
               <Brief>{targetUser.username}</Brief>
             </Item>
           )
          })
        }

      </List>
    )
  }
}


export default connect(
  state=>({user:state.user,chat:state.chat}),
  {}
)(Message)