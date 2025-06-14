module.exports = {
    env: {
        node: true,
        jest: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'node',
        'jest'
    ],
    rules: {
        'no-console': ['warn', { allow: ['error'] }],
        'prefer-const': 'warn',
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error'
    }
}