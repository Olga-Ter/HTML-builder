const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'files');
const newDirPath = path.join(__dirname, 'files-copy');

fs.mkdir(newDirPath, { recursive: true }, (err) => {
  if (err) console.log('Error');
});

function copyDir(newDirPath, copyDirPath) {
  fs.readdir(newDirPath, (error, files) => {
    if (error) {
      console.log('Error');
    } else {
      files.forEach((file) => {
        fs.unlink(path.join(newDirPath, file), (err) => {
          if (err) console.log('Error');
        });
      });
    }
  });
  fs.readdir(copyDirPath, (error, files) => {
    if (error) {
      console.log('Error');
    } else {
      files.forEach((file) => {
        fs.copyFile(
          path.join(copyDirPath, file),
          path.join(newDirPath, file),
          (err) => {
            if (err) console.log('Error');
          },
        );
      });
    }
  });
}
copyDir(newDirPath, dirPath);
