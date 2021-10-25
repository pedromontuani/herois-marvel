module.exports = {
  preset: 'react-native',
  verbose: true,
  transformIgnorePatterns: [
    //  incluir de acordo com a necessidade do projeto
    'node_modules/(?!(jest-)?react-native|@?react-navigation||@react-native-community)'
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
