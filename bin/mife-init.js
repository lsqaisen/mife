#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const download = require('../lib/download');

program.usage('<project-name>').parse(process.argv)

// 根据输入，获取项目名称
let projectName = program.args[0]

if (!projectName) {  // project-name 必填
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  program.help()
  return
}

const list = glob.sync('*')  // 遍历当前目录
let rootName = path.basename(process.cwd())
if (list.length) {  // 如果当前目录不为空
  const hasProject = false;
  list.filter(async name => {
    const fileName = path.resolve(process.cwd(), path.join('.', name))
    const isDir = await new Promise((resolve) => fs.stat(fileName, (_, stats) => {
      resolve(stats.isDirectory())
    }))
    console.log(name, isDir, name.indexOf(projectName) !== -1 && isDir)
    hasProject = name.indexOf(projectName) !== -1 && isDir;
    return name.indexOf(projectName) !== -1 && isDir
  })
  console.log(hasProject)
  if (hasProject) {
    console.log(`项目${projectName}已经存在`)
    return
  }
  rootName = projectName
} else if (rootName === projectName) {
  rootName = '.'
} else {
  rootName = projectName
}

go()

function go() {
  download(projectName)
    .then(target => console.log(target))
    .catch(err => console.log(err))
}
