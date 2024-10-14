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