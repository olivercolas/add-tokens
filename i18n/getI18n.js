const shell = require('shelljs')

export default function getI18n() {
  const locales = []

  shell.ls(__dirname + '/locales').forEach(file => {
    const lang = file.substring(0, file.indexOf('.'))

    const fileContents = require('./locales/' + file)

    locales.push({
      code: lang,
      iso: fileContents.lang.iso,
      name: fileContents.lang.name,
      file
    })
  })

  return locales
}
