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