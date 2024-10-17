import { ItemData } from '../../utils/interface'
export type CommentProps = {
  pageSize: number;
  height?: string;
}

export type ItemProps = {
  content?: ItemData;
  isReview: boolean // 是否是评论
}

export type PersonalLetterProps = {
  isShow: boolean
}