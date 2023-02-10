const express = require('express');
const FolderList = require('../controller/folder-list');
const path = require('path');
const fs = require('fs');

console.log("testi", 1)
const router = express.Router();

router.get("/watch", (req, res) => {
  const videoId = req.query.video
  const quality = req.query.quality
  console.log("test route", videoId)
  const videoPath = path.join(`storage/${videoId}.mp4`)//__dirname
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  };
  res.writeHead(200, head);
  fs.createReadStream(videoPath).pipe(res);
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