module.exports = {
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testMatch: [
        '<rootDir>/tests/integration/**/*.test.js',
        '<rootDir>/tests/adapters/**/*.test.js',
        '<rootDir>/tests/services/**/*.test.js'
    ]
}