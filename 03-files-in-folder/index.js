const fs = require('fs');
const path = require('path');

let dirname = path.basename('./03-files-in-folder/secret-folder');

fs.readdir(path.join(__dirname, dirname), (error, files) => {
  if (error) {
    console.log('Error');
  } else {
    files.forEach((file) => {
      let filepath = path.join(__dirname, dirname, file);
      fs.stat(filepath, (error, stats) => {
        if (error) {
          console.log('Error');
        } else {
          if (stats.isFile()) {
            console.log(
              `${path.parse(filepath).name} - ${path
                .parse(filepath)
                .ext.slice(1)} - ${stats.size / 1024}kb`,
            );
          }
        }
      }); 
    }); 
  }
});
