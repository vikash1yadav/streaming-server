// import React from 'react';
// import Plyr from 'plyr';

const videoUrl = `https://shimmeringhollowworkplace.vikashyadav15.repl.co/stream`;
// const VideoPlayer = () => {
//   const [quality, setQuality] = React.useState('720p');
//   let player;

//   const handleQualityChange = (event) => {
//     setQuality(event.target.value);
//     player.source = {
//       type: 'video',
//       sources: [{
//         src: videoUrl,
//         type: 'video/mp4'
//       }]
//     };
//   };

//   React.useEffect(() => {
//     player = new Plyr('#player');
//   }, []);

//   return (
//     <div>Player
//       <select onChange={handleQualityChange} value={quality}>
//         <option value="480p">480p</option>
//         <option value="720p">720p</option>
//         <option value="1080p">1080p</option>
//       </select>
//       <video controls id="player">
//         <source src={videoUrl} type="video/mp4" />
//       </video>
//     </div>
//   );
// };

// export default VideoPlayer;


import React, { useState } from 'react';

const VideoPlayer = (props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentInput, setCurrentInput] = useState(0);
  console.log("handleTimeUpdate", props)
  const handleTimeUpdate = (event) => {
    console.log("handleTimeUpdate", event.target.currentTime)
    setCurrentTime(event.target.currentTime);
  };

  return (<>
    {/*
        <input onChange={(e) => setCurrentInput(e.target.value)} />
    {props.name} {currentTime}{currentInput}
    */}
    <video
      controls
      onTimeUpdate={handleTimeUpdate}
      src={`${videoUrl}?t=${currentTime}`}
    />
  </>
  );
};

export default VideoPlayer;

// import React, { useState } from 'react'
// import videojs from 'video.js'

// const VideoPlayer = ({ videoId }) => {
//   const [quality, setQuality] = useState('high')
//   const videoUrl = `/videos/${videoId}-${quality}.mp4`

//   const player = videojs(`video-${videoId}`, {
//     autoplay: true,
//     controls: true,
//     sources: [{
//       src: videoUrl,
//       type: 'video/mp4'
//     }]
//   })

//   return (
//     <div>
//       <select value={quality} onChange={(e) => setQuality(e.target.value)}>
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//       </select>
//       <video id={`video-${videoId}`} className="video-js"></video>
//     </div>
//   )
// }

// export default VideoPlayer

