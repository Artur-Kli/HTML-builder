const fs = require('fs'),
      path = require('path'),
      currentPath = path.join(__dirname, '/secret-folder'),
      fsPromises = fs.promises

fsPromises.readdir(currentPath, { withFileTypes: true })
  .then(files => {
    files.forEach(file => {
      if(file.isFile()) {
        const filePath = path.join(currentPath, file.name)
        const fileName = path.basename(filePath)
        const extname = path.extname(filePath)
        fsPromises
          .stat(filePath)
          .then(stats => {
            console.log(`${fileName.replace(extname, '')} - ${extname.replace('.', '')} - ${(stats.size / 1024).toFixed(3)}kb`)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  })
  .catch(err => {
    console.log(err)
  })