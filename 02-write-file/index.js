const fs = require('fs');
const greating = 'Hello!';
process.stdout.write(greating);

function exitfromTask() {
  process.stdout.write('\n The end!');
  process.exit();
}

fs.access('./02-write-file/to.txt', fs.constants.F_OK, (error) => {
  if (!error) {
    fs.writeFile('./02-write-file/to.txt', '', (error) => {
      if (error) {
        console.log('Error for write file');
      }
    });
  } else {
    fs.open('./02-write-file/to.txt', 'a', (err) => {
      if (err) throw err;
    });
  }
});
process.stdout.write('\n What is your name? \n');
process.on('SIGINT', exitfromTask);
process.stdin.on('data', (data) => {
  let temp = data.toString().trim().toLowerCase();
  if (temp == 'exit') {
    exitfromTask();
  } else {
    fs.appendFile('./02-write-file/to.txt', `${data}`, (error) => {
      if (error) process.stdout.write('Error');
    });
  }
});
