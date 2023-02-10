const fs = require('fs');
const os = require('os');
const request = require('request');
const stream = require('stream');

const url = 'https://example.com/video.mp4';
const tempFile = os.tmpdir() + '/temp-' + Date.now() + '.mp4';

const writeStream = fs.createWriteStream(tempFile);

request.get(url)
    .on('error', (err) => {
        console.error(err);
    })
    .pipe(writeStream)
    .on('close', () => {
        console.log(`Video saved to: ${tempFile}`);

        const readStream = fs.createReadStream(tempFile);
        readStream.pipe(new stream.PassThrough()).pipe(process.stdout);

        readStream.on('end', () => {
            fs.unlink(tempFile, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted temporary file: ${tempFile}`);
                }
            });
        });
    });



    // file name

const fs = require('fs');
const os = require('os');
const request = require('request');

const url = 'https://example.com/video.mp4';

request.get({ url, encoding: null }, (err, res, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let filename;
    if (res.headers['content-disposition']) {
        const contentDisposition = res.headers['content-disposition'];
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
            filename = match[1];
        }
    }

    if (!filename) {
        filename = 'video.mp4';
    }

    const tempFile = os.tmpdir() + '/' + filename;

    fs.writeFile(tempFile, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Video saved to: ${tempFile}`);
        }
    });
});


if (res.headers['content-disposition']) {
    const contentDisposition = res.headers['content-disposition'];
    const match = contentDisposition.match(/filename="(.+)"/);
    if (match) {
        filename = match[1];
    }
}