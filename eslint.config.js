import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  rules: {
    'jsdoc/require-returns-description': 'off',
  },
  languageOptions: {
    globals: {},
  },
}, {
  files: ['**/*.vue'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*', './*'],
          },
        ],
      },
    ],
  },
})
