import React, { Component } from "react";
import io from "socket.io-client";
// const socket = openSocket("http://localhost:3001/");

export default class ChatInputBox extends Component {
  constructor(props) {
    super(props);

    this.socket = io("http://localhost:3001");

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
    // e.preventDefault();
    this.setState(
      {
        form: {
          name: this.refs.name.value.trim(),
          message: this.refs.message.value.trim()
        }
      },
      this.send.bind(this)
    );
    // componentDidUpdate(prevProps, prevState) {
    // if (prevState !== this.state) {
    // this.socket.emit(
    //   "emit",
    //   JSON.stringify({
    //     form: {
    //       name: this.state.form.name,
    //       message: this.state.form.message
    //     }
    //   })
    // );
    // }
    // }
  }
  send() {
    this.socket.emit(
      "emit",
      JSON.stringify({
        name: this.state.form.name,
        message: this.state.form.message
      })
    );
  }

  render() {
    console.log(this.state.form);
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
