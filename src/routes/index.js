const express = require('express');
const FolderList = require('../controller/folder-list');
console.log("testi", 1)
const router = express.Router();

router.get("/watch", (req, res) => {
  const videoId = req.query.videoId
  const quality = req.query.quality
  console.log("test route", videoId)
  const videoPath = path.join(__dirname, `videos/${videoId}.mp4`)
  // videoPath.pipe(res)
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  };
  res.writeHead(200, head);
  fs.createReadStream(filePath).pipe(res);
  // res.sendFile(videoPath)
})

router.get('/folders', FolderList.getFolderList);


// router.get('/stream',stream)
router.get('/api/', (req, res) => {
  console.log("res")
  res.status(200).send({
    data: "This is stream-server Index. Use the respective routes to begin.",
  })
});

module.exports = router;