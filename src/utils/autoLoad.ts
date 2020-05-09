import glob from 'fast-glob'
import * as path from 'path'

const formatPath = (directory: string, file: string) =>
  path.resolve(directory, file)

const prepareGlobPatterns = (patterns: string[]) =>
  patterns.map((pattern) => pattern.replace('\\', '/'))

const getFilePathsFromGlobs = async (patterns: string[]) => {
  patterns = prepareGlobPatterns(patterns)

  const files: string[] = []

  for (const pattern of patterns) {
    await glob(pattern).then((globFiles) => {
      for (const file of globFiles) {
        const filePath = formatPath(process.cwd(), file.toString())
        files.push(filePath)
      }
    })
  }

  return files
}

export const autoLoad = async (patterns: string[]): Promise<void> => {
  const files = await getFilePathsFromGlobs(patterns)
  files.forEach((file) => import(file))
}
