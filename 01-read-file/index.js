const fs = require('fs');
const path = require('path');

const filePath = __dirname;
const readStream = new fs.createReadStream(
  path.join(filePath, 'text.txt'),
  'utf8',
);

readStream.on('readable', function () {
  var data = readStream.read();
  if (data !== null) console.log(data);
});

// readStream.on('data', function (chunk) {
//   if (chunk !== null) console.log(chunk);
// });

readStream.on('error', function () {
  console.log('Error');
  readStream.destroy();
});
