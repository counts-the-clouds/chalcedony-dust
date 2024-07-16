global.FileHelper = (function() {

  function readJSON(path) {
    return new Promise(resolve => {
      fs.readFile(path, (error, contents) => {
        if (error) { throw error; }
        resolve(JSON.parse(contents));
      });
    });
  }

  function writeJSON(path, object) {
    return new Promise(resolve => {
      fs.writeFile(path, JSON.stringify(object), error => {
        if (error) { throw error; }
        resolve();
      });
    });
  }

  function recursiveFileList(path) {
    let fileList = [];

    if (fs.existsSync(path)) {
      fs.readdirSync(path, { withFileTypes:true }).forEach(item => {
        if (item.isFile() && item.name.match(/\.js$/)) {
          fileList.push(`${path}/${item.name}`)
        }
        if (item.isDirectory()) {
          fileList = fileList.concat(recursiveFileList(`${item.path}/${item.name}`))
        }
      })
    }

    return fileList;
  }

  return {
    readJSON,
    writeJSON,
    recursiveFileList,
  }

})();
