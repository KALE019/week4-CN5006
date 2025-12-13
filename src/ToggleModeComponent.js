import React from "react";
import "./App.css";
import sad from "./sad.png";
import happy from "./happy.png";

class ToggleMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pic: happy };
    this.Toggle_Mode = this.Toggle_Mode.bind(this);
    this.mode = "happy";
  }

  Toggle_Mode() {
    this.setState((prev) => {
      if (prev.pic === sad) {
        this.mode = "happy";
        return { pic: happy };
      } else {
        this.mode = "sad";
        return { pic: sad };
      }
    });
  }

  render() {
    return (
      <div className="toggle-mode">
        <h3>This is output of Task2: {this.mode}</h3>
        <button className="emoji-button" onClick={this.Toggle_Mode}>
          <img src={this.state.pic} alt={this.mode} className="emoji-img" />
        </button>
      </div>
    );
  }
}

export default ToggleMode;
