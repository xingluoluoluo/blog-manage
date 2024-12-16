import Mock from 'mockjs'
const Random = Mock.Random
// 总览数据
export const overview = Mock.mock({
  "code": 200, // 返回码 200正常，300未通过验证，500网络错误,404
  "data": {
    "fileNum": Random.float(60, 100, 2, 2) + 'M',
    "acticleNum|0-50": 0,
    "imagesNum|0-50": 0,
    "diaryNum|0-50": 0,
    "projectNum|0-50": 0,
    "resourceNum|0-50": 0,
  }
})

// 访问量数据mock
export const visit = Mock.mock({
  "code": 200,
  "data|30": [
    {
      "date": "@datetime('MM-dd')",
      "count|10-90": 10
    }
  ]
})

// 数据监测mock
export const survey = Mock.mock({
  "code": 200,
  "data": {
    "divice": [
      { "key": 'moblie', "name": '移动端', "value|35-100": 60 },
      { "key": 'pc', "name": '电脑端', "value|25-110": 55 },
    ],
    "divicemonth": [
      { "key": 'moblie', "name": '移动端', "value|140-400": 240 },
      { "key": 'pc', "name": '电脑端', "value|100-440": 220 },
    ],
    "website": [
      { "key": 'homepage', "name": '首页', "value|10-40": 12 }, // 首页
      { "key": 'gallery', "name": '图库', "value|20-30": 22 }, // 图库
      { "key": 'blog', "name": '博客', "value|18-35": 18 }, // 博客
      { "key": 'diary', "name": '笔记', "value|22-38": 32 }, // 笔记
    ],
    "websitemonth": [
      { "key": 'homepage', "name": '首页', "value|40-160": 48 }, // 首页
      { "key": 'gallery', "name": '图库', "value|80-120": 88 }, // 图库
      { "key": 'blog', "name": '博客', "value|72-140": 72 }, // 博客
      { "key": 'diary', "name": '笔记', "value|88-258": 32 }, // 笔记
    ],
  }
})

// 评论mock
export const comment = Mock.mock({
  "code": 200,
  "data|123": {
    "total": 123,
    "list|123": [
      {
        "id|+1": 0,
        "article": {
          "id|+1": 2,
          "title": "@ctitle(3,15)"
        },
        "user": {
          "id|+1": 3,
          "userName": "@ctitle(2,10)",
          "imgUrl": 'https://wx4.sinaimg.cn/orj360/435aa443ly1hug4mrkkomj20j60cs45w.jpg'
        },
        "comment": '@cparagraph(1,4)',
        "moment": '@datetime()',
        "praiseNum|0-12": 0,
        "criNum|1-19": 0
      }
    ]
  }
})

// 文章状态
export const articleStauts = Mock.mock({
  "code": 200,
  "data": [
    { "id": 0, "publishStatus": '1', "count|0-25": 5 },
    { "id": 1, "publishStatus": '0', "count|0-25": 3 },
  ]
})

// 分组
export const subset = Mock.mock({
  "code": 200,
  "data": {
    "total|100-120": 103,
    "list|5": [
      {
        "id|+1": 0,
        "subsetName": "@ctitle(2,5)",
        "count|5-20": 7,
        "createTime": "@datetime()"
      }
    ]
  }
})

// 图片合集
const pohotos = [
  'a.jpg',
  'b.jpg',
  'c.jpg',
  'd.jpg',
  'e.jpg',
  'f.jpg',
  'g.jpg',
  'h.jpg',
  'i.jpg',
  'j.jpg',
  'k.jpg',
  'l.jpg',
  'm.jpg',
  'n.jpg',
  'o.jpg',
  'p.jpg',
  'q.jpg',
]


// 文件数据
export const file = Mock.mock({
  "code": 200, // 返回码 200正常，300未通过验证，500网络错误,404
  "data": {
    "total": 64,
    // "currentPage": number,
    // "pageSize": number,
    "list|64": [{
      "id|+1": 0,
      "fileUrl|1": pohotos,
      "fileName": "@ctitle(2,12)",
      "format": "jpeg",//文件格式
      "subsetId|0-4": 3// 所属分组
    }]
  }
})

// 标签
export const labelMock = Mock.mock({
  "code": 200,
  "data": {
    "total|100-120": 103,
    "list|5": [
      {
        "id|+1": 0,
        "labelName": "@ctitle(2,5)",
        "createTime": "@datetime()"
      }
    ]
  }
})

// 文章
export const articleMock = Mock.mock({
  "code": 200,
  "data": {
    "total|40-120": 64,
    "list|64": [
      {
        "id|+1": 0,
        "title": "@ctitle(4,10)",
        "subsetId|0-4": 0,
        "createTime": "@datetime()",
        "label|0-1": ["@ctitle(2,4)"],
        "introduce": '@cparagraph(2,4)',
        "coverUrl|1": pohotos,
        "publishStatus|0-1": 0,
        "viewNum|10-23": 21,
        "commentNum|12-33": 21,
        "praiseNum|11-56": 21,
        "criNum|12-28": 21,
      }
    ]
  }
})
// 图库
export const galleryMock = Mock.mock({
  "code": 200,
  "data": {
    "total|40-120": 64,
    "list|64": [
      {
        "id|+1": 0,
        "title": "@ctitle(4,10)",
        "subsetId|0-4": 0,
        "createTime": "@datetime()",
        "label|0-1": ["@ctitle(2,4)"],
        "introduce": '@cparagraph(2,4)',
        "coverUrl|1": pohotos,
        "publishStatus|0-1": 0,
        "viewNum|10-23": 21,
        "commentNum|12-33": 21,
        "praiseNum|11-56": 21,
        "criNum|12-28": 21,
      }
    ]
  }
})
