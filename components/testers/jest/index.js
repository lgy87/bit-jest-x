import jest from "jest"
import path, { sep } from "path"
import extractFileNameFromPath from "@bit/bit.utils.file.extract-file-name-from-path"
import { exec } from "child-process-promise"
import convertJestFormatToBitFormat, { getJestFailure } from "./resultsAdapter"
import readResults from "./readResults"
import upath from "upath"

import "jsdom"

const run = specFile => {
  const convertedSpecFile = upath.normalize(specFile)
  const resultsFilePath = `${extractFileNameFromPath(specFile)}-results.json`
  const jestPath = path.normalize(
    `${__dirname}${sep}..${sep}node_modules${sep}jest${sep}bin${sep}jest.js`,
  )
  const jestCmdConfig = "--passWithNoTests"

  // We are using outputFile flag because in some cases when using --json only
  // There is not valid json return, see details here:
  // https://github.com/facebook/jest/issues/4399

  var ROOT = jestPath.split("/.git/")[0]
  var jestConfigFile = `${ROOT}/bit.jest.config.js`

  var cmd = `"${
    process.execPath
  }" "${jestPath}" ${jestCmdConfig} "${convertedSpecFile}" --rootDir="${ROOT}" --config="${jestConfigFile}" --json --outputFile="${resultsFilePath}"`

  return exec(cmd)
    .then(({ err, stdout, stderr }) => {
      const parsedResults = readResults(resultsFilePath)
      return convertJestFormatToBitFormat(parsedResults)
    })
    .catch(({ message, stdout, stderr }) => {
      // We can arrive here for two reasons:
      // 1. Testing is finished with errors, and then we want to parse the error from the results
      // 2. Error in testing process, and then we parse the catch error.
      try {
        const parsedResults = readResults(resultsFilePath)
        return convertJestFormatToBitFormat(parsedResults)
      } catch (err) {
        return getJestFailure(message)
      }
    })
}

export default {
  run,
  globals: {
    jest,
  },
  modules: {
    jest,
  },
}
