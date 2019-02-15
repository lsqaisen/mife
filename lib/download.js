const path = require('path');
const download = require('download-git-repo');
const ora = require('ora');

module.exports = function (target) {
  target = path.join(target || '.', '')
  return new Promise((resolve, reject) => {
    const url = 'direct:https://github.com/lsqaisen/mife-demo.git#master';
    const spinner = ora(`Downloading template...`);
    spinner.start();
    download(url, target, { clone: true }, (err) => {
      if (err) {
        spinner.fail() // wrong :(
        reject(err)
      } else {
        spinner.succeed() // ok :)
        resolve(target)
      }
    })
  })
}
