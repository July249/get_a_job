import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Team Blog',
  description: 'Team Blog',
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Content', link: '/content' },
      // { text: 'Contributors', link: '/contributors' },
      // { text: 'Templates', link: '/templates' },
    ],

    sidebar: {
      '/content/': [
        {
          text: '스터디 기록',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/content/index' },
            {
              text: '자바스크립트의 변수 선언 (var, let, const)',
              link: '/content/javascript/var-let-const',
            },
            { text: 'CSR, SSR, SSG', link: '/content/web/basic/csr-ssr-ssg' },
            { text: 'React - 생애주기', link: '/content/web/react/life-cycle' },
            { text: 'React - Rendering', link: '/content/web/react/rendering' },
            { text: 'React - useEffect', link: '/content/web/react/useEffect' },
            {
              text: 'React - useMemo & useCallback',
              link: '/content/web/react/useMemo-useCallback',
            },
            { text: 'React - useReducer', link: '/content/web/react/useReducer' },
            { text: 'React - useRef', link: '/content/web/react/useRef' },
            { text: 'React - useState', link: '/content/web/react/useState' },
            { text: 'React - virtual DOM', link: '/content/web/react/virtual-dom' },
          ],
        },
      ],
      // '/templates/': [
      //   {
      //     text: '문서 템플릿',
      //     collapsed: false,
      //     items: [
      //       { text: '템플릿 목록', link: '/templates/index' },
      //       { text: '회의록 템플릿', link: '/templates/meeting-template' },
      //       { text: '발표 템플릿', link: '/templates/presentation-template' },
      //     ],
      //   },
      // ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/July249/team-blog' }],
  },
});
