<!--  -->
<template>
  <div class="article-item">
    <yk-space size="xl">
      <div class="article-item_cover">
        <yk-image
          fit="cover"
          width="160"
          height="120"
          :src="url"
          :isLazy="true"
          :preview="false"
        />
        <p
          class="article-item_unpublish"
          v-if="props.data?.publishStatus === 0"
        >
          未发布
        </p>
      </div>
      <div style="width: 100%">
        <p class="article-item_title">{{ props.data?.title }}</p>
        <p class="article-item_introduce">{{ props.data?.introduce }}</p>
        <div class="article-item_bottom">
          <yk-space size="xl">
            <yk-text type="secondary">
              {{ subsetStore.subsetName(props.data?.subsetId) }}
              <yk-text
                type="secondary"
                v-if="props.data?.label && props.data?.label?.length > 0"
              >
                /
                <span
                  v-for="(item, index) in props.data?.label"
                  :key="index"
                  style="padding-right: 4px"
                  >{{ item }}
                </span>
              </yk-text>
            </yk-text>
            <yk-text type="third">
              {{ momentFunc(props.data.createTime) }}
            </yk-text>
            <yk-space>
              <yk-text type="third">
                <IconEyeOutline /> {{ props.data.viewNum }}
              </yk-text>
              <yk-text type="third">
                <IconLikeOutline /> {{ props.data.praiseNum }}
              </yk-text>
              <yk-text type="third">
                <IconCommentOutline /> {{ props.data.commentNum }}
              </yk-text>
              <yk-text type="third">
                <IconCrossOutline /> {{ props.data.criNum }}
              </yk-text>
            </yk-space>
          </yk-space>
          <yk-space size="xl" class="article-item_bottom_right">
            <yk-tooltip
              placement="top"
              title="发布"
              v-if="props.data.publishStatus === 0"
            >
              <IconSendOutline @click="changeStatus" />
            </yk-tooltip>
            <yk-tooltip
              placement="top"
              title="撤回"
              v-if="props.data.publishStatus === 1"
            >
              <IconRevokeOutline @click="changeStatus" />
            </yk-tooltip>
            <yk-tooltip placement="top" title="编辑">
              <IconFillOutline />
            </yk-tooltip>
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
// store
const subsetStore = useSubsetStore()
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
// 改变状态
const changeStatus = () => {
  emits('changeStatus', { id: props.data.id, publishStatus: props.data.publishStatus })
}
</script>
<style lang='less' scoped>
.article-item {
  width: 100%;
  border-radius: @radius-m;
  background: @bg-color-l;
  padding: @space-xl;
  &_cover {
    position: relative;
    border-radius: @radius-m;
    overflow: hidden;
    width: 160px;
    flex: none;
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
    font-size: 20px;
    font-weight: 600;
    padding-bottom: @space-s;
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
      .yk-icon {
        width: 20px;
        height: 20px;
        color: @font-color-s;
        cursor: pointer;
        &:hover {
          color: @pcolor;
        }
      }
    }
  }
}
</style>