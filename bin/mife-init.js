#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const inquirer = require('inquirer');
const latestVersion = require('latest-version');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const download = require('../lib/download');
const generator = require('../lib/generator');

program.usage('<project-name>')
  .option('-r, --repository [repository]', 'assign to repository')
  .parse(process.argv);

let projectName = program.args[0];

if (!projectName) {
  // Project-name is empty, showing --help(project-name为空，显示--help)
  program.help()
  return
}

const list = glob.sync('*');
let rootName = path.basename(process.cwd());
let next = undefined

if (list.length) {
  if (list.filter(name => {
    const fileName = path.resolve(process.cwd(), path.join('.', name))
    const isDir = fs.lstatSync(fileName).isDirectory();
    return name.indexOf(projectName) !== -1 && isDir
  }).length !== 0) {
    console.log(`${projectName} directory is exist`)
    return
  }
  next = Promise.resolve(projectName)
} else if (rootName === projectName) {
  next = inquirer.prompt([
    {
      name: 'buildInCurrent',
      message: 'The current directory is empty and the directory name is the same as the project name. Do you want to create a new project directly in the current directory?',
      // message: '当前目录为空，目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
      type: 'confirm',
      default: true
    }
  ]).then(answer => {
    return Promise.resolve(answer.buildInCurrent ? projectName : '.')
  })
} else {
  next = Promise.resolve(projectName)
}

go()

function go() {
  next.then(projectName => {
    if (projectName !== '.') {
      fs.mkdirSync(projectName)
      const url = program.repository ? program.repository : 'lsqaisen/mife-demo.git#master'
      download(url, projectName)
        .then(target => {
          return {
            name: projectName,
            root: projectName,
            downloadTemp: target
          }
        })
        .then(context => {
          console.log(context)
          return inquirer.prompt([
            {
              name: 'projectName',
              message: 'name',
              default: context.name
            },
            {
              name: 'projectVersion',
              message: 'version',
              default: '1.0.0'
            },
            {
              name: 'projectDescription',
              message: 'description',
              default: `A project named ${context.name}`
            }
          ]).then(answers => {
            return {
              ...context,
              metadata: {
                ...answers
              }
            }
          })
        })
        .then(context => {
          return generator(context.metadata, context.downloadTemp, path.parse(context.downloadTemp).dir);
        })
        .then(res => {
          console.log(logSymbols.success, chalk.green('found success:)'))
          console.log(chalk.green('cd ' + res.dest + '\nnpm install\nnpm run dev'))
        })
        .catch(error => {
          console.error(logSymbols.error, chalk.red(`found faild：${error.message}`))
        })
    }
  })
  // next.then(projectRoot => {
  //   if (projectRoot !== '.') {
  //     fs.mkdirSync(projectRoot)
  //   }
  //   return download(projectRoot).then(target => {
  //     return {
  //       name: projectRoot,
  //       root: projectRoot,
  //       downloadTemp: target
  //     }
  //   })
  // }).then(context => {
  //   return inquirer.prompt([
  //     {
  //       name: 'projectName',
  //       message: '项目的名称',
  //       default: context.name
  //     }, {
  //       name: 'projectVersion',
  //       message: '项目的版本号',
  //       default: '1.0.0'
  //     }, {
  //       name: 'projectDescription',
  //       message: '项目的简介',
  //       default: `A project named ${context.name}`
  //     }
  //   ]).then(answers => {
  //     return latestVersion('macaw-ui').then(version => {
  //       answers.supportUiVersion = version
  //       return {
  //         ...context,
  //         metadata: {
  //           ...answers
  //         }
  //       }
  //     }).catch(err => {
  //       return Promise.reject(err)
  //     })
  //   })
  //   return generator(context)
  // }).then(context => {
  //   console.log(logSymbols.success, chalk.green('创建成功:)'))
  //   console.log()
  //   console.log(chalk.green('cd ' + context.root + '\nnpm install\nnpm run dev'))
  // }).catch(err => {
  //   console.error(logSymbols.error, chalk.red(`创建失败：${err.message}`))
  // })
}
