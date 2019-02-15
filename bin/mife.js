#!/usr/bin/env node

const program = require('commander')
program.version('1.0.0')
  .usage('<command> [project-name]')
  .command('hello', 'this will run mife-hello.js') // Git-style sub-commands
  .command('test', 'this will run mife-test.js') // Git-style sub-commands
  .command('init', 'this will run mife-init.js')
  .parse(process.argv)

// test case
// node ./bin/mife.js hello
// node ./bin/mife.js test my-project
// node ./bin/mife.js init my-project