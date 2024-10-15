// 评论内容
export type ItemData = {
  id: number;
  article?: {
    id: number;
    title: string;
  }; // 所属文章信息，可能展示已被删除
  user: {
    id: string | number;
    userName: string;
    imgUrl: string;
  };
  comment: string;// 评论内容
  moment: string;// 评论时间
  praiseNum: number; // 点赞数
  criNum: number; // 点踩数
}