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

// 文章分组
export type SubsetData = {
  id: number | string;
  subsetName: number | string;
  count: number;
  createTime?: string;
}

// 文件信息
export type FileData = {
  id: number;
  fileUrl: string;
  fileName: string;
  format: string;//文件格式
  subsetId?: number;// 所属分组
  selected?: boolean;// 是否选择
}

// 标签
export type LabelData = {
  id: number | string;
  labelName: number | string;
  createTime?: string;
}

// 文章
export interface ArticleData {
  id: number;
  title: string;
  subsetId?: number | string; //区分未分组
  createTime: Date;// 时间
  label?: string[]; //标签可能有多个
  introduce?: string; // 简介
  coverUrl: string;// 封面地址
  viewNum: number;// 查看次数
  publishStatus: number;// 0未发布， 1已发布
  commentNum: number;// 评论数
  praiseNum: number; // 点赞数
  criNum: number; // 点踩数
}