import { ItemData } from '../../utils/interface'
export type CommentProps = {
  pageSize: number;
}

export type ItemProps = {
  content?: ItemData;
  isReview: boolean // 是否是评论
}