const fs = require('fs'),
      path = require('path'),
      fsPromises = fs.promises,
      output = fs.createWriteStream(bundlePath),
      stylePath = path.join(__dirname, 'styles'),
      bundlePath = path.join(__dirname, 'project-dist/bundle.css');

fsPromises
  .readdir(stylePath)
  .then(files => {
    files.forEach(file => {
      const filePath = path.join(stylePath, file);
      const fileName = path.basename(filePath);
      const extname = path.extname(filePath);
      if (extname === '.css') {
        const input = fs.createReadStream(path.join(stylePath, fileName));
        input.on('data', data => {
          output.write(data.toString() + '\n');
        })
      }
    })
  })