#! /usr/bin/env node

global.fs = require('fs');

require('../src/helpers/file-helper.js');

const ROOT = require('path').normalize(`${__dirname}`).replace(/\\/g,"/").replace(/\/bin/,'');

console.log("=== Compiling manifest.json ===");

let fileList = [];
addFiles('src');
addFiles('data');

// In paths that contain the project name, we need to convert the absolute
// paths to relative paths from the project root.
let index = fileList[fileList.length-1].indexOf('application') + 'application'.length + 1;
fileList = fileList.map(file => {
  return file.includes('application') ? file.substring(index) : file;
});

console.log(`Writing list of ${fileList.length} source files.`)
console.log(fileList);

// Finally write this file list as a JSON file.
FileHelper.writeJSON(`${ROOT}/manifest.json`, { fileList });

function addFiles(path) {
  fileList = fileList.concat(FileHelper.recursiveFileList(`${ROOT}/${path}`));
}
