<!--  -->
<template>
  <yk-space size="m" class="item">
    <yk-avatar
      v-if="isReview"
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
      <yk-space size="s" align="center" v-if="isReview">
        <yk-tag type="primary">{{ content?.article?.title }}</yk-tag>
        <div>
          <IconLikeFill style="color: red" v-show="content?.praiseNum" /><span
            v-show="content?.praiseNum"
            >&nbsp;{{ content?.praiseNum }}</span
          >
        </div>
        <div>
          <IconCrossFill
            style="color: darkblue"
            v-show="content?.criNum"
          /><span v-show="content?.criNum">&nbsp;{{ content?.criNum }}</span>
        </div>
      </yk-space>
      <IconDeleteOutline
        class="item_main_delete"
        @click.stop="deleteItem(props.content.id)"
      />
    </yk-space>
  </yk-space>
</template>

<script lang='ts' setup>
import { ItemProps } from './review'
const props = withDefaults(defineProps<ItemProps>(), {
  isReview: true
})

const emits = defineEmits(["delete"])
//删除单条数据
const deleteItem = (e: number) => {
  emits('delete', e)
}
</script>
<style lang='less' scoped>
.item {
  width: 100%;
  &_main {
    border-bottom: 1px solid @line-color-s;
    width: 100%;
    padding-bottom: @space-l;
    flex: 1;
    &_delete {
      position: absolute;
      right: 0;
      top: 0;
      width: 16px;
      height: 16px;
      cursor: pointer;
      color: @font-color-s;
      display: none;
    }
  }
  &__name {
    display: flex;
    flex-direction: column;
  }
  &:hover {
    .item_main_delete {
      display: block;
    }
  }
}
</style>