const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const directoryPath = path.join('storage');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send({ error: 'Unable to scan directory: ' + err });
        }

        const items = [];

        files.forEach((file) => {
            fs.stat(path.join(directoryPath, file), (err, stat) => {
                if (err) {
                    return res.status(500).send({ error: err });
                }

                if (stat.isFile()) {
                    items.push({ name: file, type: 'file' });
                } else if (stat.isDirectory()) {
                    items.push({ name: file, type: 'directory' });
                }

                if (items.length === files.length) {
                    res.send({ items });
                }
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
