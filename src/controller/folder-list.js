const path = require('path');
const fs = require('fs');
const FOLDER_PATH = 'videos';

class folderList {
  getFolderList = async (req, res, next) => {
    console.log("folder list API")
    let folderPath = path.join(FOLDER_PATH);
    let folders = await this.getFoldersList(folderPath);
    return res.send(folders);
  }
  getFoldersList = async (folderPath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(folderPath, { withFileTypes: true }, async (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        let folderNames = files.map((folder) => folder.name);
        let isLeapFolder = folderNames.includes("config.json");
        let folders = files
          .filter((file) => file.isDirectory())
          .map((file) => ({
            name: file.name,
            children: [],
          }));
        if (!isLeapFolder) {
          for (let i = 0; i < folders.length; i++) {
            let nestPath = path.join(folderPath, folders[i].name);
            let nestFolders = await getFoldersList(nestPath);
            folders[i].children = nestFolders;
          }
          console.log("if f")
          resolve(folders);
        } else {
          console.log("else f")
          resolve([]);
        }
      });
    });
  }

}
const FolderList = new folderList();

module.exports = FolderList;