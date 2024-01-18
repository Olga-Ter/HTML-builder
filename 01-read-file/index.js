const fs = require('fs');
const path = require('path');

const filePath = __dirname;
const readStream = fs.createReadStream(path.join(filePath, 'text.txt'), 'utf8');

const handleError = () => {
  console.log('Error');
  readStream.destroy();
}
readStream
.on('error', handleError)
.on('data', (chunk) => {
  console.log(chunk);
});