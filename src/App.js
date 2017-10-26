import React, { Component } from "react";
import "./App.css";
import ChatInputBox from "./Components/ChatInputBox";
import ChatLog from "./Components/ChatLog";
import { messages } from "./api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: []
    };

    messages((err, data) => {
      this.setState({
        message: data
      });
    });

    // subscribeToTimer((err, timestamp) =>
    //   this.setState({
    //     timestamp
    //   })
    // );
  }
  render() {
    return (
      <div className="App">
        <ChatLog messages={this.state.message} />
        <ChatInputBox />
      </div>
    );
  }
}

export default App;
