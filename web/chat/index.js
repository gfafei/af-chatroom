import React, { Component, PropTypes } from 'react';
import socket from '../socket';
import './chat.less';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.doLoadMore = this.doLoadMore.bind(this);
  }

  componentWillMount() {
    socket.on('message', this.receiveMessage);
    socket.on('loadMore', this.doLoadMore);
  }

  componentDidMount () {
    if (!this.props.getUser()) {
      this.context.router.push('/signIn');
    } else {
      this.context.router.push('/chat');
    }
  }

  handleKeyDown (event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  loadMore () {
    const { messages } = this.state;
    const createTime = messages.length ? messages[0].createTime : new Date();
    socket.emit('loadMore', { createTime });
  }

  doLoadMore (data) {
    const { messages } = this.state;

    if (data.status === 'success') {
      if (data.messages.length) {
        data.messages.forEach((message) => {
          messages.unshift(message)
        });
        this.setState({ messages });
      } else {
        // TODO 这里好像会执行两次，socket收到两次返回，貌似是socket的bug
        // alert('没有更多了');
      }
    } else {
      alert(data.err);
    }
  }

  sendMessage() {
    const message = this.$messageInput.value;
    if (message.length) {
      socket.emit('message', { message });
      this.$messageInput.value = null;
    }
  }

  receiveMessage(data) {
    const { messages } = this.state;
    messages.push({
      creator: data.creator,
      content: data.content,
      createTime: data.createTime,
    });
    this.setState({ messages }, () => {
      //自动滚动到底部
      const $chatContent = document.getElementsByClassName('chat-content')[0];
      $chatContent.scrollTop = $chatContent.scrollHeight;
    });

  }

  render() {
    let $messageList = [];
    this.state.messages.forEach((message, i) => {
      let classNames = ['message-item'];
      const user = this.props.getUser();
      if (message.creator._id === user._id) {
        classNames.push('message-self');
      }
      $messageList.push(
        <li className={classNames.join(' ')} key={i}>
          <div>
            <span className="message-sender">{message.creator.username}</span>
            <span className="message-time">{message.createTime}</span>
          </div>
          <div className="message-content">{message.content}</div>
        </li>
      );
    });
    return (
      <div className="chat">
        <div className="chat-content" >
          <div className="load-more"  onClick={this.loadMore}>加载更多...</div>
          <ul className='message-list'>
            {$messageList}
          </ul>
        </div>
        <div className="chat-footer">
          <input
            className='message-input'
            ref={(el) => {this.$messageInput = el}}
            onKeyDown={this.handleKeyDown}
          />
          <button onClick={this.sendMessage}>
            <span>ENTER</span>
          </button>
        </div>
      </div>
    )
  }

}

Chat.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
