import { defineUserConfig } from 'vuepress/cli'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'AIGC 技术咨询专家',
  description: '帮助中小企业落地 AIGC，降低内容成本，提升效率',
  base: '/',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'author', content: '真空中的球形鸡' }],
    ['meta', { name: 'keywords', content: 'AIGC, 人工智能, 技术咨询, 内容生成, AI落地' }],
    ['meta', { name: 'description', content: '帮助中小企业落地 AIGC，降低内容成本，提升效率' }],
    ['meta', { property: 'og:title', content: 'AIGC 技术咨询专家' }],
    ['meta', { property: 'og:description', content: '帮助中小企业落地 AIGC，降低内容成本，提升效率' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // Google Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' }],
  ],
  bundler: viteBundler(),
  theme: defaultTheme({
    // 主题色
    themePlugins: {
      git: false,
      backToTop: true,
    },
    // 编辑链接
    editLinks: true,
    editLinkText: '编辑此页',
    // 最后更新时间
    lastUpdated: true,
    lastUpdatedText: '最后更新',
    // 贡献者
    contributors: false,
    // 外部图标
    externalLinkIcon: true,
    logo: '/logo.png',
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '关于我',
        link: '/about.html',
      },
      {
        text: '技术文章',
        link: '/articles/',
      },
      {
        text: '项目案例',
        link: '/projects/',
      },
      {
        text: '方法论',
        link: '/methodology/',
      },
      {
        text: '服务',
        link: '/services.html',
      },
      {
        text: '联系方式',
        link: '/contact.html',
      },
    ],
    sidebar: {
      '/articles/': [
        {
          text: 'AIGC 落地实战',
          link: '/articles/aigc-practice.html',
        },
        {
          text: '财富自由之路',
          link: '/articles/wealth-freedom.html',
        },
        {
          text: '技术顾问之路',
          link: '/articles/tech-consultant.html',
        },
      ],
      '/projects/': [
        {
          text: '财富自由软件',
          link: '/projects/wealth-freedom-app.html',
        },
        {
          text: 'AI 换脸项目',
          link: '/projects/ai-face-swap.html',
        },
      ],
      '/methodology/': [
        {
          text: '财务安全目标计算',
          link: '/methodology/financial-safety.html',
        },
        {
          text: '时间价值',
          link: '/methodology/time-value.html',
        },
        {
          text: '企业家收入路径',
          link: '/methodology/entrepreneur-path.html',
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username' },
      { icon: 'email', link: 'mailto:your-email@example.com' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present 真空中的球形鸡',
    },
  }),
})
