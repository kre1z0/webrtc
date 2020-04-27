import React, { useRef, RefObject, useEffect, useState } from "react";

import { fetchStream } from "api/video";
import { Resizer } from "components/Resizer/Resizer";

const widthRatio = 4;

export const Video = () => {
  const video: RefObject<HTMLVideoElement> = useRef(null);
  const [error, setError] = useState(null);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const stream = await fetchStream();

        video.current.srcObject = stream;
        await video.current.play();

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

  const width = window.innerWidth / widthRatio;
  const height = Math.round(width / ratio);

  return (
    <>
      {error && <span>{error.toString()}</span>}
      <Resizer element={video.current} ratio={ratio}>
        <video ref={video} width={width} height={height} />
      </Resizer>
    </>
  );
};
