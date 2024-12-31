<!--  -->
<template>
  <div class="gallery-item">
    <yk-space size="s" dir="vertical">
      <div class="gallery-item-content">
        <div class="gallery-item_cover">
          <yk-image
            fit="cover"
            width="238"
            height="120"
            :src="url"
            :isLazy="true"
            :preview="false"
          />
        </div>
        <yk-space :size="2">
          <div class="gallery-item-content--left image-div">
            <yk-image
              fit="cover"
              width="78"
              height="78"
              :src="'src/assets/images/' + props.data.content?.[0]"
              :isLazy="true"
              :preview="false"
              v-if="props.data?.content?.[0]"
            />
          </div>
          <div class="gallery-item-content--center image-div">
            <yk-image
              fit="cover"
              width="78"
              height="78"
              :src="'src/assets/images/' + props.data.content?.[1]"
              :isLazy="true"
              :preview="false"
              v-if="props.data?.content?.[1]"
            />
          </div>
          <div class="gallery-item-content--right image-div">
            <yk-image
              fit="cover"
              width="78"
              height="78"
              :src="'src/assets/images/' + props.data.content?.[2]"
              :isLazy="true"
              :preview="false"
              v-if="props.data?.content?.[2]"
            />
          </div>
        </yk-space>
        <yk-space class="gallery-item_bottom_right" :size="4">
          <IconFillOutline />
          <yk-popconfirm
            trigger="click"
            placement="topRight"
            title="确定删除"
            content="删除将不可恢复"
            @confirm="deleteItem"
          >
            <IconDeleteOutline />
          </yk-popconfirm>
        </yk-space>
      </div>

      <div style="width: 100%">
        <p class="gallery-item_title">{{ props.data?.title }}</p>
        <div class="gallery-item_bottom">
          <yk-space size="xl">
            <yk-space>
              <yk-text type="third"> 查看 {{ props.data.viewNum }} </yk-text>
              <yk-text type="third"> 喜欢 {{ props.data.praiseNum }} </yk-text>
              <!-- <yk-text type="third">
                <IconCommentOutline /> {{ props.data.commentNum }}
              </yk-text>
              <yk-text type="third">
                <IconCrossOutline /> {{ props.data.criNum }}
              </yk-text> -->
            </yk-space>
          </yk-space>
          <yk-text type="third">
            {{ momentFunc(props.data.createTime) }}
          </yk-text>
        </div>
      </div>
    </yk-space>
  </div>
</template>

<script lang='ts' setup>
import { computed, getCurrentInstance } from 'vue';
import { ArticleData } from '../../utils/interface'
import { useSubsetStore } from '../../store/subset'
import { momentFunc } from '../../utils/moment'

// const proxy: any = getCurrentInstance()?.proxy

type ArticleItemProps = {
  data: ArticleData
}
const props = withDefaults(defineProps<ArticleItemProps>(), {})

const emits = defineEmits(["deleteItem", "changeStatus"])
// 封面路径
const url = computed(() => {
  return `src/assets/images/${props.data?.coverUrl}`
})
// 删除文章
const deleteItem = () => {
  emits('deleteItem', props.data.id)
}

</script>
<style lang='less' scoped>
.gallery-item {
  width: 238px;
  border-radius: @radius-m;
  background: @bg-color-l;

  &_cover {
    position: relative;
    border-radius: @radius-m @radius-m 0 0;
    padding-bottom: 2px;
    overflow: hidden;
    flex: none;
  }
  &-content {
    &--left {
      border-radius: 0 0 0 @radius-m;
      overflow: hidden;
    }
    &--right {
      border-radius: 0 0 @radius-m 0;
      overflow: hidden;
    }
    .image-div {
      width: 78px;
      height: 78px;
      background: @gray-2;
    }
    &:hover {
      .gallery-item_bottom_right {
        opacity: 1;
      }
    }
  }
  &_unpublish {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: rgba(27, 74, 215, 0.704);
    line-height: 36px;
    color: @white;
    font-weight: 600;
  }
  &_title {
    font-size: @size-l;
    font-weight: 600;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  &_introduce {
    height: 48px;
    font-size: @size-m;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color: @font-color-l;
    margin-bottom: @space-m;
    max-width: 720px;
  }
  &_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_right {
      position: absolute;
      right: @space-l;
      top: @space-l;
      background-color: rgba(255, 255, 255, 0.56);
      border-radius: @radius-m;
      padding: @space-ss;
      opacity: 0;
      &:hover {
        background-color: rgba(255, 255, 255, 0.64);
        backdrop-filter: blur(2px);
      }
      .yk-icon {
        width: 24px;
        height: 24px;
        padding: 5px;
        color: @gray;
        cursor: pointer;
        &:hover {
          color: @pcolor;
        }
      }
    }
  }
}
</style>
<style lang="less">
.yk-image {
  border-radius: 0;
}
</style>