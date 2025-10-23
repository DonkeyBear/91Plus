import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  languageOptions: {
    globals: {
      $: 'readonly', // 使用 window 內的 jQuery
    },
  },
})
