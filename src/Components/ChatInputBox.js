import React, { Component } from "react";

export default class ChatInputBox extends Component {
  render() {
    return (
      <div className="box">
        <input id="handle" type="text" placeholder="Handle" />
        <input id="message" type="text" placeholder="Message" />
        <button id="send">SEND</button>
      </div>
    );
  }
}
