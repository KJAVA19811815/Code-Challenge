import React, { Component } from "react";

export default class ChatLog extends Component {
  renderMessages = () => {
    if (this.props.messages.length === 0) {
      return <p>No messages</p>;
    } else {
      return this.props.messages.map(function(m) {
        return <p>{m.message}</p>;
      });
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <div id="mario-chat">
          <div id="chat-window">
            <div id="output">{this.renderMessages()}</div>
          </div>
        </div>
      </div>
    );
  }
}
