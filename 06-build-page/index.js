const fs = require('fs');
const path = require('path');

const projectDistPath = path.join(__dirname, 'project-dist');
const projectHtmlPath = path.join(projectDistPath, 'index.html');
const projectCssPath = path.join(projectDistPath, 'style.css');
const assetsPath = path.join(__dirname, 'assets');
const copyAssetsPath = path.join(projectDistPath, 'assets');
const stylesPath = path.join(__dirname, 'styles');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const stylesArr = [];
let index = 0;

fs.mkdir(projectDistPath, { recursive: true }, (err) => {
  if (err) {
    console.log('Error');
  } else {
    fs.access(projectHtmlPath, fs.constants.F_OK, (err) => {
      if (err) {
        bundleHtmlFile();
        bundleCssFile();
      } else {
        truncateHtmlCss(projectHtmlPath, projectCssPath);
        createStyleCss(stylesPath, projectCssPath);
      }
    });
  }
});
fs.mkdir(copyAssetsPath, { recursive: true }, (err) => {
  if (err) {
    console.log('Error');
  } else {
    fs.readdir(copyAssetsPath, (error, files) => {
      if (error) {
        console.log('Error: read newAssets dir');
      } else {
        if (files.length !== 0) clearAssetsDir(copyAssetsPath);
        copyAssetsDir(assetsPath, copyAssetsPath);
      }
    });
  }
});

function bundleHtmlFile() {
  fs.open(projectHtmlPath, 'a+', (err) => {
    if (err) {
      console.log('Error for writing');
    } else {
      //createIndexHtml();
    }
  });
}

function bundleCssFile() {
  fs.open(projectCssPath, 'a+', (err) => {
    if (err) {
      console.log('Error for writing');
    } else {
      createStyleCss(stylesPath, projectCssPath);
    }
  });
}

function truncateHtmlCss(htmlPath, cssPath) {
  fs.truncate(htmlPath, (err) => {
    if (err) {
      console.log('Error: html file was not clear');
    }
  });
  fs.truncate(cssPath, (err) => {
    if (err) {
      console.log('Error: css file was not clear');
    }
  });
}

function copyAssetsDir(dirPath, dirToCopyPath) {
  fs.readdir(dirPath, (error, files) => {
    if (error) {
      console.log('Error');
    } else {
      files.forEach((file) => {
        let filepath = path.join(dirPath, file);
        let fileTopath = path.join(dirToCopyPath, file);
        fs.stat(filepath, (error, stats) => {
          if (error) {
            console.log('Error fs.stat');
          } else {
            if (stats.isFile()) {
              fs.copyFile(filepath, fileTopath, (err) => {
                if (err) console.log('Error: file was not copy');
              });
            } else {
              fs.mkdir(fileTopath, { recursive: true }, (err) => {
                if (err) console.log('Error');
              });
              copyAssetsDir(filepath, fileTopath);
            }
          }
        });
      });
    }
  });
}

function clearAssetsDir(dirToCopyPath) {
  fs.readdir(dirToCopyPath, (err, files) => {
    if (err) {
      console.log('Error read newAssets dir');
    } else {
      files.forEach((file) => {
        let filepath = path.join(dirToCopyPath, file);
        fs.rm(filepath, { recursive: true }, (err) => {
          if (err) console.log('Error: dir was not delete');
        });
      });
    }
  });
}

function createStyleCss(cssPath, cssToPath) {
  fs.readdir(cssPath, (error, files) => {
    if (error) {
      console.log('Error read styles dir');
    } else {
      files.forEach((file) => {
        let filepath = path.join(cssPath, file);
        fs.stat(filepath, (error, stats) => {
          if (error) {
            console.log('Error stats');
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
                  fs.appendFile(cssToPath, `${stylesArr[index]}`, (err) => {
                    if (err) console.log('Error');
                  });
                  index += 1;
                });
            }
          }
        });
      });
    }
  });
}

//copyAssetsDir(assetsPath, copyAssetsPath);
//clearAssetsDir(copyAssetsPath);
//createStyleCss(stylesPath, projectCssPath);
