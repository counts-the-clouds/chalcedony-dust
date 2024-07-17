#! /usr/bin/env node

global.fs = require('fs');

require('../src/helpers/file-helper.js');

const ROOT = require('path').normalize(`${__dirname}`).replace(/\\/g,"/").replace(/\/bin/,'');

console.log("=== Compiling manifest.json ===");

let fileList = [
  'src/constants.js',
];

addFiles('src');
addFiles('data');

// In paths that contain the project name, we need to convert the absolute
// paths to relative paths from the project root.

console.log(`Writing list of ${fileList.length} source files.`)
console.log(fileList);

// Finally write this file list as a JSON file.
FileHelper.writeJSON(`${ROOT}/manifest.json`, { fileList });

// We convert the absolute file paths the FileHelper returns to relative paths
// when adding them to the manifest. Also, we only include files that haven't
// been included yet. The fileList is initialized with the files that should be
// loaded first.
function addFiles(path) {
  FileHelper.recursiveFileList(`${ROOT}/${path}`).forEach(absolutePath => {
    const index = absolutePath.indexOf('application') + 'application'.length + 1;
    const relativePath = absolutePath.substring(index);

    if (!fileList.includes(relativePath)) {
      fileList.push(relativePath);
    }
  });
}
