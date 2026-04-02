import { defineClientConfig } from '@vuepress/client'
import { onMounted, onUnmounted } from 'vue'

export default defineClientConfig({
  setup() {
    // 页面加载完成后的初始化
    onMounted(() => {
      // 添加滚动监听
      window.addEventListener('scroll', handleScroll)

      // 初始化 smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault()
          const target = document.querySelector(this.getAttribute('href'))
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        })
      })
    })

    // 页面卸载时清理
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  },
  enhance({ app, router, siteData }) {
    // 可以在这里注册全局组件或插件
    if (typeof __VUEPRESS_DEV__ !== 'undefined' && __VUEPRESS_DEV__) {
      console.log('🚀 AIGC 技术咨询专家 - 开发模式')
    }
  }
})

// 滚动处理函数
function handleScroll() {
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled')
    } else {
      navbar.classList.remove('navbar-scrolled')
    }
  }
}
