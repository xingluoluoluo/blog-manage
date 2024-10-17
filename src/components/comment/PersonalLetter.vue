<!--  -->
<template>
  <yk-drawer placement="right" :show="isShow" @close="closeDrawer">
    <template #header> 标题 </template>
    <template #footer> 尾部 </template>
  </yk-drawer>
</template>

<script lang='ts' setup>
import { toRefs } from 'vue'
import { PersonalLetterProps } from './review'

const emits = defineEmits(['close'])
const props = withDefaults(defineProps<PersonalLetterProps>(), {
  isShow: false
})
const { isShow } = toRefs(props)

const closeDrawer = () => {
  emits('close')
}
</script>
<style lang='less' scoped>
</style>