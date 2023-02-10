import React, { useState } from 'react';
const videoUrl = `https://shimmeringhollowworkplace.vikashyadav15.repl.co/stream`;
const VideoPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  return (
    <video
      controls
      onTimeUpdate={handleTimeUpdate}
      src={`${videoUrl}?t=${currentTime}`}
    />
  );
};

export default VideoPlayer;
