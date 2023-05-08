const fs = require('fs'),
      path = require('path'),
      fsPromises = fs.promises;

(function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('\nDirectory created successfully!\n');
  })

  fsPromises.readdir(path.join(__dirname, 'files')).then(files => {
    files.forEach(file => {
      const filePath = path.join(__dirname, 'files', file);
      fsPromises.copyFile(filePath, path.join(__dirname, 'files-copy', file));
      console.log(file);
    })
    fsPromises.readdir(path.join(__dirname, 'files-copy')).then(filesCopy => {
      filesCopy.forEach(fileCopy => {
        const filePath = path.join(__dirname, 'files-copy', fileCopy);
        const fileName = path.basename(filePath)
        if(!files.includes(fileName)){
          fsPromises.unlink(filePath, (err) => {
            if (err) throw err;
          });
          console.log('\nDirectory updated successfully!\n');
        }
      })
    })
  })
})()