// 禁用git插件以解决构建问题
const { defineConfig } = require('@vuepress/cli')

module.exports = defineConfig({
  plugins: [
    // 禁用git插件
    function gitPlugin() {
      return {
        name: 'disable-git',
        onInitialized() {
          console.log('Git plugin disabled for build')
        }
      }
    }
  ]
})