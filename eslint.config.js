import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  languageOptions: {
    globals: {
      $: 'readonly', // TODO: 使用外部引入的 jQuery 以使用自動補全和型別檢查
    },
  },
})
