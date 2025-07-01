// import * as Mock from 'mockjs';
const Mock = require('mockjs');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [
    {
      'id|+1': 1, // id 从 1 开始自增。
      name: '@cname',
      'age|15-25': 1,
      city: '@county(true)',
    },
  ],
});
// 输出结果
console.log(data);
export default data;
