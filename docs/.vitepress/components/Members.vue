<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>👋 About Our Team</template>
      <template #lead
        >우리 팀은 <strong>기술과 협업, 성장</strong>을 추구하는 개발자들의
        모임입니다. 함께 배우고, 기록하고, 공유하는 문화를 만들어가고
        있습니다.</template
      >
    </VPTeamPageTitle>
    <VPTeamMembers size="small" :members="members" />
  </VPTeamPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VPTeamPage, VPTeamMembers, VPTeamPageTitle } from 'vitepress/theme';

interface Member {
  avatar: string;
  name: string;
  title: string;
  links: [{ icon: 'github'; link: string }, { icon: 'twitter'; link: string }];
}

const baseUrl = import.meta.env.BASE_URL;

const members = ref<Member[]>([]);

onMounted(async () => {
  const json = await fetch(`${baseUrl}data/members.json`).then((res) =>
    res.json()
  );

  members.value = json;
});
</script>

<style scoped>
.VPTeamPage {
  margin-top: 0;
}

.VPTeamPage > .VPTeamPageTitle {
  padding-top: 0;
}

.VPTeamPage > .VPTeamPageTitle :deep(.title) {
  margin: 48px 0 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
}
</style>
