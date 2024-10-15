<!--  -->
<template>
  <yk-space size="m" class="item">
    <yk-avatar
      img-url="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"
    ></yk-avatar>
    <yk-space dir="vertical" size="s" class="item_main">
      <div class="item__name">
        <yk-text strong>{{ content?.user.userName }}</yk-text>
        <yk-text type="third" style="font-size: 12px">{{
          content?.moment
        }}</yk-text>
      </div>
      <yk-text type="secondary">{{ content?.comment }}</yk-text>
      <yk-space size="s" align="center">
        <yk-tag type="primary">{{ content?.article?.title }}</yk-tag>
        <div>
          <IconLikeFill
            style="color: red"
            v-show="content?.praiseNum"
          />&nbsp;{{ content?.praiseNum }}
        </div>
        <div>
          <IconCrossFill
            style="color: darkblue"
            v-show="content?.criNum"
          />&nbsp;{{ content?.criNum }}
        </div>
      </yk-space>
    </yk-space>
  </yk-space>
</template>

<script lang='ts' setup>
import { ItemProps } from './review'
const props = withDefaults(defineProps<ItemProps>(), {
  isReview: true
})
</script>
<style lang='less' scoped>
.item {
  &_main {
    border-bottom: 1px solid @line-color-s;
    width: 100%;
    padding-bottom: @space-l;
  }
  &__name {
    display: flex;
    flex-direction: column;
  }
}
</style>