const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'secret-folder');
// *first way*
// fs.readdir(dirname, (error, files) => {
//   if (error) {
//     console.log('Error');
//   } else {
//     files.forEach((file) => {
//       console.log(file);
//       let filepath = path.join(dirname, file);
//       fs.stat(filepath, (error, stats) => {
//         if (error) {
//           console.log('Error');
//         } else {
//           if (stats.isFile()) {
//             console.log(
//               `${path.parse(filepath).name} - ${path
//                 .parse(filepath)
//                 .ext.slice(1)} - ${stats.size / 1024}kb`,
//             );
//           }
//         }
//       });
//     });
//   }
// });

// *second way*
fs.readdir(dirname, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log('Error');
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        let filepath = path.join(dirname, file.name);
        fs.stat(filepath, (error, stats) => {
          if (error) console.log('Error');
          else {
            console.log(
              `${path.parse(filepath).name} - ${path
                .parse(filepath)
                .ext.slice(1)} - ${stats.size / 1024}kb`,
            );
          }
        });
      }
    });
  }
});
