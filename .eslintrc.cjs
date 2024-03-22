module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  'ignorePatterns': [
    'dist/'
  ],
  'globals': {
    '$': 'readonly'
  },
  'rules': {
    'indent': [
      'warn',
      2,
      {
        'SwitchCase': 1 // 將switch中的case的縮排設置為1個空格
      }
    ],
    'linebreak-style': [
      'warn',
      'windows'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'always',
      { omitLastInOneLineBlock: true }
    ]
  }
};
