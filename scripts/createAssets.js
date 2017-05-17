#! /usr/bin/env node

process.on('unhandledRejection', err => {
  throw err
})

const createAssets = (componentName, componentPath) => {

  const fs = require('fs-extra')
  const path = require('path')
  const chalk = require('chalk')
  const Promise = require('bluebird')

  const SRC = path.join(__dirname, '..')
  const DEST = path.join(process.cwd(), componentPath)
  const encoding = 'utf8'
  const TMPL = 'templates'

  const COMPONENT_REGEX = /{{MyComponent}}/g
  const COMPONENT_PATH_REGEX = /{{my-component}}/g

  const staticFiles = [
    '.babelrc',
    '.npmignore',
    '.storybook/config.js'
  ]

  const files = [
    'CHANGELOG.md',
    'package.json',
    'README.md',
    'stories/index.js'
  ]

  const renamables = [
    'src/MyComponent.js',
    '__tests__/MyComponent.spec.js'
  ]

  const readFile = (filename) => {
    console.log('Reading file: ' + chalk.magenta(filename))
    return fs.readFile(addSrc(filename), encoding)
  }

  const parseFile = (fileString) => {
    console.log(chalk.bold('Parsing file...'))
    return fileString
      .replace(COMPONENT_REGEX, componentName)
      .replace(COMPONENT_PATH_REGEX, componentPath)
  }

  const writeFile = (file, path) => {
    console.log(chalk.bold('Writing file: ') + chalk.magenta(path))
    return fs.ensureFile(path).then(() => fs.writeFile(path, file, encoding))
  }

  const forEachAsync = (arr, fn) => {
    let promises = arr.map((item, i) => fn(item))
    return Promise.all(promises)
  }

  const addSrc = (filename) => path.join(SRC, TMPL, filename)
  const addDest = (filename) => path.join(DEST, filename)

  console.log(chalk.blue('Starting main process...'))

  const createStatic = () => {
    console.log(chalk.bold('Copying static assets.'))

    return forEachAsync(staticFiles,
      file => fs.copy(addSrc(file), addDest(file))
    )
    .then(() => console.log(chalk.green('Successfully copied static assets.')))
    .catch((e) => console.log(chalk.red('Failed to copy static assets, with error:'), e))
  }

  const createDynamic = () => {
    console.log(chalk.bold('Reading dynamic assets.'))

    return forEachAsync(files,
      file => readFile(file)
      .then(parseFile)
      .then(contents => writeFile(contents, addDest(file)))
    )
    .then(() => console.log(chalk.green('Successfully parsed and wrote dynamic assets.')))
    .catch((e) => console.log(chalk.red('Failed to parse and write dynamic assets, with error:'), e))
  }

  const createComponent = () => {
    console.log('Reading component assets.')

    return forEachAsync(renamables,
      file => readFile(file)
      .then(parseFile)
      .then(contents => writeFile(contents, addDest(file.replace('MyComponent', componentName))))
    )
    .then(() => console.log(chalk.green('Successfully parsed, wrote and renamed component assets.')))
    .catch((e) => console.log(chalk.red('Failed to parse, write or rename component assets, with error:'), e))
  }

  const createGitIgnore () => {
    console.log('Creating .gitignore file.')

    return writeFile('node_modules\n', addDest('.gitignore'))
    .then(() => console.log(chalk.green('Successfully added .gitignore.')))
    .catch((e) => console.log(chalk.red('Failed to add .gitignore file, with error:'), e))
  }

  return Promise.all([
    createStatic(),
    createDynamic(),
    createComponent(),
    createGitIgnore()
  ])
}

module.exports = createAssets
