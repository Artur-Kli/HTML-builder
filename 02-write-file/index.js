const fs = require('fs'),
      path = require('path'),
      { stdin, stdout, exit } = require('process'),
      filePath = path.join(__dirname, 'text.txt'),
      output = fs.createWriteStream(filePath);

stdout.write("Hello! Enter the text...\n");
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    sayGoodBye();
  }
  output.write(data)
})

function sayGoodBye() {
  stdout.write("\nYou're perfect! Have a good day!");
  exit();
}

process.on('SIGINT', sayGoodBye);
