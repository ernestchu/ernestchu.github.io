const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Ernie Chu',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],

    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'ernestchu/ernestchu.github.io',
    editLinks: true,
    docsDir: 'docs/src',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: true,
    smoothScroll: true,
    sidebarDepth: 2,
    nav: [
      {
        text: 'TSM-Net',
        link: '/tsm-net/introduction'
      },
      {
        text: 'Courses',
        ariaLabel: 'Courses Menu',
        items: [
          {
            text: 'CSE350 Computer Network',
            link: '/courses/cse350-computer-network/introduction'
          },
          { 
            text: 'CSE365 Unix System Programming',
            link: '/courses/cse365-unix-system-programming/introduction'
          },
          { 
            text: 'CSE491 Network Application Programming',
            link: '/courses/cse491-network-application-programming/introduction'
          }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],
      '/tsm-net/': [
        {
          title: 'TSM-Net',
          collapsable: false,
          children: [
            'introduction',
            'progress-2021-3-26',
            'progress-2021-3-19',
            'progress-2021-3-12',
            'progress-2021-3-5',
            'progress-2021-2-26'
          ]
        }
      ],
      '/courses/cse350-computer-network/': [
        {
          title: 'CSE350 Computer Network',
          collapsable: false,
          children: [
            'introduction',
            'chapter-1',
            'chapter-2'
          ]
        }
      ],
      '/courses/cse365-unix-system-programming/': [
        {
          title: 'CSE365 Unix System Programming',
          collapsable: false,
          children: [
            'introduction',
            'lecture-1',
            'lecture-2',
            'lecture-3',
            'lecture-4',
            'lecture-5',
            'lecture-6',
            'midterm-review'
          ]
        }
      ],
      '/courses/cse491-network-application-programming/': [
        {
          title: 'CSE491 Network Application Programming',
          collapsable: false,
          children: [
            'introduction',
            'chapter-1',
            'chapter-2',
            'chapter-3',
            'chapter-4',
            'chapter-5',
            'chapter-6'
          ]
        }
      ]
    }
  },
  markdown: {
    extendMarkdown: md => {
      md.set({
        html: true,
      })
      md.use(require('markdown-it-katex'))
    },
    lineNumbers: true,
    toc: {
      includeLevel: [2, 3, 4]
    }
  },
  head: [
    ['link', {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.2/katex.min.css'
    }],
    ['link', {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
    }]
  ],
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-medium-zoom'
  ]
}
