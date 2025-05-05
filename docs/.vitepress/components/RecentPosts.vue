<template>
  <div class="recent-posts">
    <h2>{{ Text.RECENT_POSTS }}{{ '(' + recentPostsCount + ')' }}</h2>
    <div class="posts-list">
      <div v-for="post in recentPosts" :key="post.url" class="post-item">
        <a :href="baseUrl + post.url" class="post-link">
          <h3 class="post-title">{{ post.title }}</h3>
          <span class="tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{
              tag
            }}</span>
          </span>
          <p class="post-description">{{ post.description }}</p>
          <p class="post-date">{{ post.date }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Text } from '../constants/text';
interface Post {
  title: string;
  description: string;
  date: Date;
  author: string;
  tags: string[];
  url: string;
}

const baseUrl = import.meta.env.BASE_URL;

const recentPosts = ref<Post[]>([]);
const recentPostsCount = ref(5);

onMounted(async () => {
  const json = await fetch(`${baseUrl}data/posts.json`).then((res) =>
    res.json()
  );

  if (json.length > recentPostsCount.value) {
    recentPosts.value = json.slice(0, recentPostsCount.value);
  } else {
    recentPosts.value = json;
    recentPostsCount.value = json.length;
  }
});
</script>

<style scoped>
.recent-posts {
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.recent-posts h2 {
  margin-top: 1rem;
  padding-top: 0;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  border-top: none;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-height: 640px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

@media (max-width: 600px) {
  .posts-list {
    max-height: 180px;
  }
}

.post-item {
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.post-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: var(--vp-c-gray-soft);
}

.post-item:hover .tag {
  color: var(--vp-c-brand-1);
}

.post-link {
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.post-title {
  margin: 0;
  font-size: 1.1rem;
}

.post-description {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.post-date {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
</style>
