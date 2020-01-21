module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'spaced-comments': 'off',
    'vue/require-v-for-key': 'warning'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
