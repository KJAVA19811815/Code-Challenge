import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001/");

export default class ChatInputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arr: ["Roger", "Rafa", "Andy", "Novak"],
      form: {
        name: "",
        message: ""
      }
    };
  }

  random() {
    return this.state.arr[Math.floor(Math.random() * this.state.arr.length)];
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      form: {
        name: this.refs.name.value.trim(),
        message: this.refs.message.value.trim()
      }
    });
    console.log("sending");
    socket.on("news", function() {
      socket.emit(
        "task",
        JSON.stringify({
          form: {
            name: this.state.form.name,
            message: this.state.form.message
          }
        })
      );
    });
  }

  render() {
    return (
      <div className="box">
        <form>
          <input id="handle" ref="name" type="text" value={this.random()} />
          <input id="message" ref="message" type="text" placeholder="Message" />
          <button id="send" onClick={this.handleSubmit.bind(this)}>
            SEND
          </button>
        </form>
      </div>
    );
  }
}
