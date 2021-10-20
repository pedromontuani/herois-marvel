module.exports = {
  preset: 'react-native',
  verbose: true,
  setupFilesAfterEnv: [
    //  incluir de acordo com a necessidade do projeto
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/__tests__/jest.setup.js'
  ],
  transformIgnorePatterns: [
    //  incluir de acordo com a necessidade do projeto
    'node_modules/(?!(jest-)?react-native|@?react-navigation||@react-native-community)|react-native-encrypted-storage'
  ],
  testPathIgnorePatterns: [
    //  incluir de acordo com a necessidade do projeto
    '<rootDir>/ios',
    '<rootDir>/android',
    '<rootDir>/__tests__/jest.setup.js',
    '<rootDir>/__tests__/utils',
    '<rootDir>/__tests__/__mocks__',
    '<rootDir>/node_modules'
  ]
};
