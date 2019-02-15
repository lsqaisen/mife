const path = require('path');
const download = require('download-git-repo');

module.exports = function (target) {
  target = path.join(target || '.', '')
  return new Promise((resolve, reject) => {
    // 这里可以根据具体的模板地址设置下载的url，注意，如果是git，url后面的branch不能忽略
    download('direct:https://github.com/lsqaisen/micro-frontend.git#master',
      target, { clone: true }, (err) => {
        if (err) {
          reject(err)
        } else {
          // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
          resolve(target)
        }
      })
  })
}
