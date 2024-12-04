<!--  -->
<template>
  <div class="file-item">
    <div
      class="file-item_img"
      :class="{ 'file-item--selected': props.data?.selected }"
    >
      <yk-image
        :src="url"
        width="200"
        height="200"
        :lazy="true"
        fit="contain"
      ></yk-image>
      <yk-space class="file-item_img_tool">
        <IconDeleteOutline class="files_tool_delete" />
        <IconSwitchOutline class="files_tool_switch" />
      </yk-space>
      <div class="file-item_img--check">
        <IconTickMinOutline style="color: #fff; font-size: 24px" />
      </div>
    </div>
    <div class="file-item__name">
      <yk-text class="file-item__name_front">{{
        props.data?.fileName
      }}</yk-text>
      <yk-text>.{{ props.data?.format }}</yk-text>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { FileData } from '../../utils/interface'

type FileItemProps = {
  data?: FileData
}
const props = withDefaults(defineProps<FileItemProps>(), {})

// 图片路径
const url = computed(() => {
  return `src/assets/images/${props.data?.fileUrl}`
})
</script>
<style lang='less' scoped>
.file-item {
  text-align: center;

  &_img {
    position: relative;
    border-radius: @radius-s;
    border: 2px solid @bg-color-l;
    &_tool {
      position: absolute;
      right: @space-s;
      bottom: @space-s;
      opacity: 1;

      .yk-icon {
        width: 32px;
        height: 32px;
        padding: @space-s;
        background: rgba(255, 255, 255, 0.56);
        border-radius: @radius-m;
        transition: all @animatb;
        cursor: pointer;
      }
      &:hover {
        color: @pcolor;
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(2px);
      }
    }
    &--check {
      width: 26px;
      height: 26px;
      border-radius: @radius-s;
      background: @gray-4;
      position: absolute;
      left: @space-s;
      top: @space-s;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.56);
      opacity: 0;
      .yk-icon {
        opacity: 0;
      }
    }
    &:hover {
      background: @pcolor-1;
      .file-item_img--check {
        opacity: 1;
      }
      .file-item_img_tool {
        opacity: 1;
      }
    }
  }
  &--selected {
    background: @pcolor-1;
    border: 2px solid @pcolor-3;
    .file-item_img--check {
      opacity: 1;
      background: @pcolor;
      .yk-icon {
        opacity: 1;
      }
    }
    .file-item_img_tool {
      opacity: 0;
    }
    &:hover {
      .file-item_img_tool {
        opacity: 0;
      }
    }
  }
  &__name {
    padding-top: @space-l;
    display: flex;
    justify-content: center;
    &_front {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
  }
}
</style>