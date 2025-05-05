<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <RecentPosts v-if="frontmatter.layout === 'home'" />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import RecentPosts from '../components/RecentPosts.vue';

const { frontmatter } = useData();
</script>

<style scoped></style>
