/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item

 class Chat extends Component {
  state={
    content:'',
    isShow:false
  }

/*   componentWillMount () {
     const emojisStr = '❤❤❤❤❤😊😊😊😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊😀😁😂😄😆😊'
     this.emojis = []
     emojisStr.split('').forEach(emoji => {
       this.emojis.push({
         text: emoji
       })
     })
   }*/
   componentWillMount () {
     const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
       ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
       ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
       ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
     this.emojis = []
     emojis.forEach(emoji => {
       this.emojis.push({
         text: emoji
       })
     })
   }


  send=()=>{
    const {content}=this.state;
    if(!content.trim()) {
      return
    }
    const from=this.props.user._id;
    const to=this.props.match.params.userid;
    this.props.sendMsg({content,from,to});
    this.setState({content: '',isShow:false})
  }
   componentDidMount() {
     // 初始显示列表
     window.scrollTo(0, document.body.scrollHeight)


   }
  componentWillUnmount(){
     const meId=this.props.user._id;
      const targetId=this.props.match.params.userid;
      this.props.readMsg(targetId, meId)
  }

   componentDidUpdate () {
     // 更新显示列表
     window.scrollTo(0, document.body.scrollHeight)

   }
   toggleEmojis=()=>{
    const isShow=this.state.isShow
    this.setState({isShow:!isShow})
     if(isShow){
      setTimeout(()=>{
        window.dispatchEvent(new Event('resize'))
      },0)
     }
   }

  render() {
    const {user}=this.props;
 //   console.log(user,111);
    const meId=user._id;
   // console.log(meId)
     const targetId=this.props.match.params.userid;
   // console.log(targetId)
    const chatId=[meId,targetId].sort().join('_');
   // console.log(chatId)
    const {users,chatMsgs}=this.props.chat;
   // console.log(this.props.chat,users)
    if(!users[meId]) {
      return <div>Loading...</div>
    }
    const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)
   //console.log(msgs)
    const targetIcon=require(`../../assets/img/${users[targetId].header}.png`)
    //console.log(targetIcon)


    return (


      <div id='chat-page'>
        <NavBar
          icon={<Icon type='left'/>}
          onLeftClick={() => this.props.history.goBack()}
          >
          {users[targetId].username}
          </NavBar>
        <List  style={{marginBottom:50}}>


          {
            msgs.map((msg, index) => {
              if(msg.to===meId) { // 别人发给我的
                return (
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                )
              } else { // 我发给别人的
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra='我'
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }

        </List>

        <div className='am-tab-bar'>
          <InputItem
            onChange={(val)=>{this.setState({content:val})}}
            onFocus={()=>this.setState({isShow:false})}
            value={this.state.content}
            placeholder="请输入"
            extra={
              <span>
                <span onClick={this.toggleEmojis}>😊表情</span>
                 <span onClick={this.send}>发送</span>
              </span>

            }
          />

          {
            this.state.isShow
              ? (
                <Grid
                  data={this.emojis}
                  columnNum={8}
                  carouselMaxRow={4}
                  isCarousel={true}
                  onClick={(item) => {
                    this.setState({content: this.state.content + item.text})
                  }}
                />
              )
              : null
          }
        </div>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user,chat: state.chat}),
  {sendMsg,readMsg}
)(Chat)