const fs = require('fs');
const path = require('path');

const filePath = __dirname;
const greating = 'Hello! What is your name? \n';

function exitfromTask() {
  process.stdout.write('\n The end!');
  process.exit();
}

function addFile(data) {
  const writeStream = fs.createWriteStream(path.join(filePath, 'output.txt'), {
    flags: 'a',
  });
  writeStream.write(data);
}

process.stdout.write(greating);
process.on('SIGINT', exitfromTask);
process.stdin.on('data', (data) => {
  let temp = data.toString().trim().toLowerCase();
  if (temp == 'exit') {
    exitfromTask();
  } else {
    addFile(data);
  }
});
