import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Team Blog',
  description: 'Team Blog',
  base: '/get_a_job/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Content', link: '/content' },
    ],

    sidebar: {
      '/content/': [
        {
          text: '스터디 기록',
          collapsed: false,
          items: [
            // AUTO-GENERATED-SIDEBAR:START
            { text: '자바스크립트의 변수 선언 (var, let, const)', link: '/content/javascript/var-let-const' },
            { text: '웹 렌더링 방식 (CSR, SSR, SSG)', link: '/content/web/basic/csr-ssr-ssg' },
            { text: 'React의 생명주기(Life Cycle)', link: '/content/web/react/life-cycle' },
            { text: 'React의 렌더링 방식', link: '/content/web/react/rendering' },
            { text: 'React useEffect Hook', link: '/content/web/react/useEffect' },
            { text: 'React useMemo와 useCallback', link: '/content/web/react/useMemo-useCallback' },
            { text: 'React useReducer Hook', link: '/content/web/react/useReducer' },
            { text: 'React useRef Hook', link: '/content/web/react/useRef' },
            { text: 'React useState Hook', link: '/content/web/react/useState' },
            { text: 'React의 Virtual DOM', link: '/content/web/react/virtual-dom' },
            // AUTO-GENERATED-SIDEBAR:END
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/July249/get_a_job' }],
  },
});
