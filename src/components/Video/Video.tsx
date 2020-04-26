import React, { createRef, useEffect, useState } from "react";

import { VideoContainer, Resizer } from "components/Video/styled";

const widthRatio = 4;

export const Video = () => {
  const video = createRef();
  const [ratio, setRatio] = useState(0);
  const [width, setWidth] = useState(window.innerWidth / widthRatio);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        video.current.srcObject = stream;
        video.current.play();

        setRatio(
          stream.getVideoTracks()[0].getSettings().width /
            stream.getVideoTracks()[0].getSettings().height,
        );
      } catch (err) {
        setError(err);
      }
    }
    fetchVideo();
  }, []);

  const height = Math.round(width / ratio);
  const percent = 0.15;
  const resizerWidth = Math.round(width * percent);

  return (
    <VideoContainer>
      <video width={width} height={height} ref={video} />
      <Resizer width={resizerWidth} />
    </VideoContainer>
  );
};
