import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Cyrus API",
  description: "Fake JSON API for fast prototyping",
  themeConfig: {
    nav: [
      { text: 'Docs', link: '/guide/get-started' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Cyrus API?', link: '/guide/what-is-cyrus-api' },
          { text: 'Get started', link: '/guide/get-started' },
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Todos', link: '/guide/todos', },
          { text: 'Users', link: '/guide/users', }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/krzysztofkaptur/cyrus-api' },
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/krzysztofkaptur/cyrus-api/blob/master/LICENSE.txt" target="_blank">MIT License</a>.',
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://frontdev.me" target="_blank">Chris</a>`
    }
  }
})
