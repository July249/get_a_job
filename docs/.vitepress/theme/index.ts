import DefaultTheme from 'vitepress/theme';
import Members from '../components/Members.vue';
import RecentPosts from '../components/RecentPosts.vue';

import type { App } from 'vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('RecentPosts', RecentPosts);
    app.component('Members', Members);
  },
};
