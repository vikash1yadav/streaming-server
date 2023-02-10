const http = require('http');
const fs = require('fs');
const path = require('path');
// http.createServer
const server = ((req, res) => {
  const filePath = path.join('videos', 'Solo _ South Dubbed Full Movie - Telugu Full Movies - Dulquer Salmaan, Dhansika, Neha Sharma.mp4');
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.query.range || req.headers.range;
  console.log("range", range)
  if (range) {
    
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
console.log("hit in range", parts,start, end )
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    console.log("hit in else")
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

const port = 3000;
module.exports = server
// server.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
