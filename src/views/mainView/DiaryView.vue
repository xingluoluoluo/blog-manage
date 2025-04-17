<!--  -->
<template>
  <yk-space dir="vertical" style="width: 100%" size="l" class="diary-view">
    <TopTitle name="随笔随记" style="margin-bottom: 8px"></TopTitle>
    <yk-space style="width: 100%" size="l">
      <diary style="width: 100%" />
      <diaryEditor style="width: 456px" />
    </yk-space>
  </yk-space>
</template>

<script lang='ts' setup>
import TopTitle from '../../components/frame/TopTitle.vue';
import diary from '../../components/diary/diary.vue'
import diaryEditor from '../../components/diary/diaryEditor.vue'
</script>
<style lang='less' scoped>
</style>