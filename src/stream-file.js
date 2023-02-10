const http = require('http');
const fs = require('fs');
const path = require('path');
const request = require('request');
const { v4: uuidv4 } = require('uuid');
// http.createServer
const server = ((req, res) => {
  const range = req.query.range || req.headers.range;
  const file = req.query.file

  const streamFile = (tempFile, notRequired) => {
    const filePath = path.join(tempFile);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    console.log("range", range)
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      console.log("hit in range", parts, start, end)
      const chunkSize = (end - start) + 1;
      const fileContent = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      fileContent.pipe(res);        

      if (notRequired) {
        fileContent.on('end', () => {
          fs.unlink(tempFile, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Deleted temporary file: ${tempFile}`);
            }
          });
        });
      }
    } else {
      console.log("hit in else")
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  }

    streamFile(file);  
  // else if (file.includes("https://" || "http://")) {
  //   console.log("checking..", file.includes("https://" || "http://"));
  //   // const https = require('https');
  //   const filename = `${uuidv4()}.mp4`;
  //   const tempFile = 'storage/' + filename;
  //   const writeStream = fs.createWriteStream(tempFile);

  //   request.get(file).on('error', (err) => {
  //     console.error(err);
  //   }).pipe(writeStream).on('close', () => {
  //     console.log(`Video saved to: ${tempFile}`);
  //     streamFile(tempFile, { type: "tempFile", notRequired: true });
  //   })
  //   // res.send({data:"downloading"})
  // }
});

const port = 3000;
module.exports = server
// server.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
