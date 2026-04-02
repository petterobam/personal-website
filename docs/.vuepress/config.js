module.exports = {
  title: 'AIGC 技术咨询专家',
  description: '帮助中小企业落地 AIGC，降低内容成本，提升效率',
  theme: '@vuepress/theme-default',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'author', content: '真空中的球形鸡' }],
    ['meta', { name: 'keywords', content: 'AIGC, 人工智能, 技术咨询, 内容生成, AI落地' }],
    ['meta', { name: 'description', content: '帮助中小企业落地 AIGC，降低内容成本，提升效率' }],
  ],
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    '@vuepress/search',
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '关于我', link: '/about' },
      { text: '技术文章', link: '/articles/' },
      { text: '项目案例', link: '/projects/' },
      { text: '方法论', link: '/methodology/' },
      { text: '服务', link: '/services' },
      { text: '联系方式', link: '/contact' },
    ],
    sidebar: {
      '/articles/': [
        {
          title: 'AIGC 落地实战',
          path: '/articles/aigc-practice'
        },
        {
          title: '财富自由之路',
          path: '/articles/wealth-freedom'
        },
        {
          title: '技术顾问之路',
          path: '/articles/tech-consultant'
        },
      ],
      '/projects/': [
        {
          title: '项目案例',
          path: '/projects/'
        },
      ],
      '/methodology/': [
        {
          title: '财务规划',
          path: '/methodology/financial-planning'
        },
        {
          title: '时间价值',
          path: '/methodology/time-value'
        },
        {
          title: '投资策略',
          path: '/methodology/investment'
        },
        {
          title: '组织建设',
          path: '/methodology/organization-building'
        },
      ],
    },
    lastUpdated: false,
    smoothScroll: true,
  }
}