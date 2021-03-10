module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'vue/return-in-computed-property': 'off',
    'quotes': [2, 'single', { 'avoidEscape': true }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  ignorePatterns: ['**/*spec.js']
}
