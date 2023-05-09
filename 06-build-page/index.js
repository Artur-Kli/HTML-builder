const fs = require('fs'),
      path = require('path'),
      fsPromises = fs.promises,
      stylePath = path.join(__dirname, 'styles'),
      assetsPath = path.join(__dirname, 'assets'),
      componentsPath = path.join(__dirname, 'components'),
      dist = path.join(__dirname, 'project-dist'),
      assetsPathCopy = path.join(dist, 'assets');

function createTemplate() {
  fs.copyFile(`${__dirname}\\template.html`, `${dist}\\index.html`, (error) => {
    if (error) console.log(error);
    fs.readFile(`${dist}\\index.html`, 'utf8', (error, data) => {
      if(error) console.log(error);
      fs.readdir(componentsPath, {withFileTypes: true}, (error, files) => {
        if (error) console.log(error);
        files.forEach((file) => {
          fs.readFile(`${componentsPath}\\${file.name}`, 'utf8', (error, dataFile) => {
            if(error) console.log(error);
            let tagName = `{{${file.name.split('.')[0]}}}`;
            data = data.replace(tagName, dataFile);
            fs.writeFile(`${dist}\\index.html`, data, (error) => {
              if(error) console.log(error);
            });
          });
        });
      });
    });
  });
};

function recurceCopy(dir, exit) {
  fs.readdir(dir, {withFileTypes: true}, (error, files) => {
    if (error) console.log(error);
    files.forEach((file) => {
      if (!file.isFile()) {
        fs.stat(path.join(exit, file.name), (error) => {
          if (error) {
            fs.mkdir(path.join(exit, file.name), (error) => {
              if (error) console.log(error);
            });
            recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
          } else {
            recurceCopy(`${dir}\\${file.name}`, path.join(exit, file.name));
          }
        });
      } else {
        fs.copyFile(`${dir}\\${file.name}`, `${exit}\\${file.name}`, (error) => {
          if (error) console.log(error);
        });
      }
    });
  });
}

fs.stat(dist, (error) => {
  if (error) {
    fs.mkdir(dist, (error) => {
      if (error) 
        (error) => console.log(error);
    });
    createTemplate();
  } else {
    fs.readdir(dist, (error) => {
      if (error)
        console.log(error);
      else
        createTemplate();
    })
  }
})

fs.stat (assetsPathCopy, (error) => {
  if (error) {
    fs.mkdir(assetsPathCopy, (error) => {
      if (error) 
        console.log(error);
    });
    recurceCopy(assetsPath, assetsPathCopy);
  } else {
    recurceCopy(assetsPath, assetsPathCopy);
  }
});

fsPromises
  .readdir(stylePath, {withFileTypes: true})
  .then(files => {
    files.forEach((file, index) => {
      let filePath = path.join(stylePath, file.name);
      if (file.isFile() && file.name.split('.')[1] === 'css') {
        fsPromises
          .readFile(filePath, 'utf-8')
          .then(data => {
            if (index === 0) {
              fsPromises
                .writeFile(path.join(dist, 'style.css'), data, (error) => {
                  if (error) console.log(error);
                });
            } else {
              fsPromises.appendFile(path.join(dist, 'style.css'), data, error => {
                if (error) console.log(error);
              });
            };
          })
          .catch(error => {
            console.log(error)
          });
      };
    });
  })
  .catch(error => {
    console.log(error)
  });