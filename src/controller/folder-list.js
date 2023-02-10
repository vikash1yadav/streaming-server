const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
// var mime = require('mime');
const FOLDER_PATH = 'storage';

class folderList {
  getFolderList = async (req, res, next) => {
    console.log("folder list API")
    const { directory } = req.query;
    let folderPath = path.join(directory||FOLDER_PATH);
    // let folders = await
    this.getFoldersList(folderPath).then((folders) => {
      return res.send({ directory: folderPath, folders });        
      }).catch(next);

  }
  getFoldersList = async (folderPath) => {
    
    return new Promise((resolve, reject) => {
      // fs.stat fs.readdir
      fs.readdir(folderPath, { withFileTypes: true }, async (err, files) => {
        if (err) {
          reject(err);
          throw err;
          return;
        }
        // console.log("files",);
        // let folderNames = files.map((folder) => folder.name);
        // let isLeapFolder = folderNames.includes("config.json");
        // console.log("isLeapFolder", isLeapFolder);
        // let folders = files
        //   .filter((file) => file.isDirectory())
        //   .map((file) => ({
        //     name: file.name,
        //     children: [],
        //   }));
        // if (!isLeapFolder) {
        //   for (let i = 0; i < folders.length; i++) {
        //     let nestPath = path.join(folderPath, folders[i].name);
        //     let nestFolders = await this.getFoldersList(nestPath);
        //     folders[i].children = nestFolders;
        //   }
        //   console.log("if f")
        //   resolve(folders);
        // } else {
        //   console.log("else f")
        //   resolve([]);
        // }
        const items = [];

        for (const file of files) {
          fs.stat(path.join(folderPath, file.name), async(err, stat) => {
            if (err) {
              // return res.status(500).send({ error: err });
              reject(err);
              throw err;
              return;
            }

            if (stat.isFile()) {
              const mediaType = mime.lookup(file.name);//getType lookup
              items.push({ name: file.name, type: 'file', size: stat.size, mediaType });
            } else if (stat.isDirectory()) {
              let nestPath = path.join(folderPath, file.name);
              let nestFolders = await this.getFoldersList(nestPath);
              items.push({ name: file.name, type: 'directory', size: stat.size, children: nestFolders });
            }

            if (items.length === files.length) {
              resolve(items);
            }
            // if (file.isFile()) {
            //   items.push({ name: file.name, type: 'file', size: file?.size || "" });
            // } else if (file.isDirectory()) {
            //   let nestPath = path.join(folderPath, file.name);
            //   let nestFolders = await this.getFoldersList(nestPath);
            //   items.push({ name: file.name, type: 'directory', children: nestFolders });
            // }
            // if (items.length === files.length) {
            //   resolve(items);
            // }
          });
          // if (file.isFile()) {
          //   items.push({ name: file.name, type: 'file', size: file?.size||"" });
          // } else if (file.isDirectory()) {
          //   let nestPath = path.join(folderPath, file.name);
          //   let nestFolders = await this.getFoldersList(nestPath);
          //   items.push({ name: file.name, type: 'directory', children: nestFolders });
          // }
          // if (items.length === files.length) {
          //   resolve(items);
          // }
        }
        // files.forEach((file) => {
        //   // console.log("file path ", file, "check dir", file.isDirectory());
        //   if (file.isFile()) {
        //     items.push({ name: file.name, type: 'file' });
        //   } else if (file.isDirectory()) {
        //     let nestPath = path.join(folderPath, file.name);
        //     let nestFolders = await this.getFoldersList(nestPath);
        //     // folders[i].children = nestFolders;
        //     items.push({ name: file.name, type: 'directory', children: nestFolders });
        //   }
        //   if (items.length === files.length) {
        //     // res.send({ items });
        //     resolve(items);
        //   }
        // });
        // resolve(folders);
      });
    });
  }

}
const FolderList = new folderList();

module.exports = FolderList;