#! /usr/bin/env node

module.exports = function () {

  const constants = require('./constants')

  const chalk = require('chalk')
  const spawn = require('cross-spawn')
  const path = require('path')

  const shell = require('./shell')
  const createAssets = require('./createAssets')

  const componentName = process.argv[2]

  if (!componentName) {
    console.log(chalk.red('Failed to create component.'))
    console.log('')
    console.log('')
    console.log(chalk.bold('Proper usage:'))
    console.log(`      ${constants.cliName} <NameOfComponent>`)
    console.log('')
    console.log('')
    process.exit(1)
  }

  const componentPath = componentName.replace(/\.?([A-Z])/g, (x, y) => '-' + y.toLowerCase()).replace(/^-/, '')


  createAssets(componentName, componentPath)
    .then(() => {
      console.log(chalk.green('Successfully created assets.'))
      console.log('')
      console.log('')
      console.log(chalk.bold('Installing node_modules...'))

      shell.exec('npm install', {
        stdio: 'inherit',
        cwd: path.join(process.cwd(), componentPath)
      })
      .then(() => {
        console.log('')
        console.log(chalk.green('Successfully installed node_modules!'))
        console.log('')
        console.log('To start working on your component:')
        console.log('       ', chalk.bgBlack('cd ' + componentPath))
        console.log('Start development environment with:')
        console.log('       ', chalk.bgBlack('npm start'))
        console.log('')
      })
      .catch(e => console.log(chalk.red('Failed installing node_modules with error:', e)))
    })

}
