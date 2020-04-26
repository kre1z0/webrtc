import React, { Component, createRef } from "react";

export class Video extends Component {
  video = createRef();

  async componentDidMount() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      this.video.current.srcObject = stream;
      this.video.current.play();
    } catch (err) {
      console.log("An error occurred: " + err);
    }
  }

  render() {
    return <video ref={this.video} />;
  }
}
