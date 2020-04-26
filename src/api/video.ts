export const fetchStream = (): Promise<MediaStream> =>
  navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
    audio: false,
  });
