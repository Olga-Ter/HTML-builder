const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist');
const stylesArr = [];
let index = 0;

fs.open(path.join(bundlePath, 'bundle.css'), 'a+', (err) => {
  if (err) {
    console.log('Error for writing');
  } else {
    fs.stat(path.join(bundlePath, 'bundle.css'), (error, stats) => {
      if (error) {
        console.log('Error stats file');
      } else {
        if (stats.size === 0) {
          createBundleCss();
        } else {
          fs.truncate(path.join(bundlePath, 'bundle.css'), (err) => {
            if (err) {
              console.log('Error, file was not delete');
            } else {
              createBundleCss();
            }
          });
        }
      }
    });
  }
});

function createBundleCss() {
  fs.readdir(dirPath, (error, files) => {
    if (error) {
      console.log('Error of cheking  styles directory');
    } else {
      files.forEach((file) => {
        let filepath = path.join(dirPath, file);
        fs.stat(filepath, (error, stats) => {
          if (error) {
            console.log('Error of cheking files in styles directory');
          } else {
            if (stats.isFile() && path.extname(file) == '.css') {
              const readStream = fs.createReadStream(filepath, 'utf8');
              readStream
                .on('error', () => {
                  console.log('Error');
                  readStream.destroy();
                })
                .on('data', (chunk) => {
                  stylesArr[index] = chunk;
                  fs.appendFile(
                    path.join(bundlePath, 'bundle.css'),
                    `${stylesArr[index]}`,
                    (err) => {
                      if (err) console.log('Error');
                    },
                  );
                  index += 1;
                });
            }
          }
        });
      });
    }
  });
}

// fs.unlink(path.join(bundlePath, 'bundle.css'), (err) => {
//   if (err) {
//     console.log('Error! File was not deleted');
//   } else {
//     createBundleCss();
//   }
// });
