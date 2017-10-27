import React, { Component } from "react";
import io from "socket.io-client";

export default class ChatInputBox extends Component {
  constructor(props) {
    super(props);

    this.socket = io("http://localhost:3001");

    this.state = {
      name: this.props.sendUsername,
      message: ""
    };
  }

  nameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(e) {
    this.setState(
      {
        message: this.refs.message.value.trim()
      },
      this.send.bind(this)
    );
  }
  send() {
    this.socket.emit(
      "emit",
      JSON.stringify({
        name: this.state.name,
        message: this.state.message
      })
    );
  }

  render() {
    return (
      <div className="box">
        <form>
          <input
            id="handle"
            ref="name"
            onChange={this.nameChange.bind(this)}
            type="text"
            value={this.state.name}
          />
          <input id="message" ref="message" type="text" placeholder="Message" />
          <button id="send" onClick={this.handleSubmit.bind(this)}>
            SEND
          </button>
        </form>
      </div>
    );
  }
}
