import React, { Component, PropTypes } from 'react';
import socket from '../socket';
import './chat.less';

const propTypes = {};
const defaultProps = {};

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    socket.on('message', this.receiveMessage);
  }

  componentWillUnMount() {
    socket.removeListener('message', this.receiveMessage);
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
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
      sender: data.user,
      content: data.message,
      time: data.time,
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
      if (message.sender.id === socket.id) {
        classNames.push('message-self');
      }
      $messageList.push(
        <li className={classNames.join(' ')} key={i}>
          <div>
            <span className="message-sender">{message.sender.username}</span>
            <span className="message-time">{message.time}</span>
          </div>
          <div className="message-content">{message.content}</div>
        </li>
      );
    });
    return (
      <div className="chat">
        <div className="chat-content">
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

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;
