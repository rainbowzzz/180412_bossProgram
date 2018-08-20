/*
用户列表的UI组件
 */
import React from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {

  static propTypes={
    userList:PropTypes.array.isRequired
  }


  render() {
    const userList=this.props.userList.filter(user=>user.header);
    return (
      <WingBlank style={{marginBottom:50,marginTop:40}}>

          <WhiteSpace />
          {
            userList.map((user,index)=>
              <div key={index}>
                <WhiteSpace/>
                <Card  onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                  <Header
                    thumb={require(`../../assets/img/${user.header}.png`)}
                    extra={user.username}
                  />
                  <Body>
                  {user.post ? <div>职位: {user.post}</div> : null}
                  {user.company ? <div>公司: {user.company}</div> : null}
                  {user.salary ? <div>月薪: {user.salary}</div> :null}
                  {user.info ? <div>描述: {user.info}</div> : null}

                  </Body>
                </Card>
              </div>
            )
          }

      </WingBlank>
    )
  }
}

export default withRouter(UserList)