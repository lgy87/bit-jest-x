/*
 * Guangyao Li
 * 2018/11/21
 * lgy87@foxmail.com
 */
module.exports = {
  bail: true,
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)sx?$",
  setupFiles: ["./tests/shim.js", "./tests/setupTests.js"],
  moduleNameMapper: {
    "~/(.*)$": "<rootDir>/src/$1",
  },
}
