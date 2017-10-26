import React, { Component } from "react";
import "./App.css";
import ChatInputBox from "./Components/ChatInputBox";
import ChatLog from "./Components/ChatLog";
import openSocket from "socket.io-client";
import { subscribeToTimer } from "./api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: "no stamp"
    };

    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
  }
  render() {
    return (
      <div className="App">
        <ChatLog />
        <ChatInputBox />
        <p>This is the value: {this.state.timestamp}</p>
      </div>
    );
  }
}

export default App;
