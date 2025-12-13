import React from "react";
import "./App.css";
import like7 from "./like7.png";
import Love from "./Love.png";
import happy from "./happy.png";

class FacebookEmojiCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    this.increment = this.increment.bind(this);

    const t = this.props.type ? this.props.type.toLowerCase() : "";
    if (t === "love") this.pic = Love;
    else if (t === "like") this.pic = like7;
    else if (t === "happy") this.pic = happy;
    else this.pic = like7;
  }

  increment() {
    this.setState((prev) => ({ number: prev.number + 1 }));
  }

  render() {
    const displayType = this.props.type || "emoji";
    return (
      <div className="emoji-counter">
        <h5>It is {this.state.number} {displayType}.</h5>
        <button className="emoji-button" onClick={this.increment}>
          <img src={this.pic} alt={displayType} className="emoji-img" />
          <b>{this.state.number}</b>
        </button>
      </div>
    );
  }
}

export default FacebookEmojiCounter;
