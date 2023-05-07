const fs = require('fs'),
      path = require('path'),
      filePath = path.join(__dirname, 'text.txt'),
      stream = fs.createReadStream(filePath, 'utf-8'),
      { stdout } = process;
let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => stdout.write(data));
stream.on('error', error => console.log('Error', error.message));