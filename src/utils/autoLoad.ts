import fs from 'fs'

const getFiles = (dir: string, files_?: string[]): string[] => {
  files_ = files_ || []
  const files = fs.readdirSync(dir)
  for (let i in files) {
    const name = dir + '/' + files[i]
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_)
    } else {
      files_.push(name)
    }
  }
  return files_
}

export const autoLoad = (dir: string, extension: string): void => {
  getFiles(dir).forEach((file) => {
    if (file.endsWith(extension)) {
      import(file)
    }
  })
}
