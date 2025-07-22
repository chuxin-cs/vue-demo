export const columns16 = [
  {
    title: 'Name',
    key: 'name',
    tree: true
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
];

export const data12 = [
  {
    id: '100',
    name: 'John Brown',
    age: 18,
    address: 'New York No. 1 Lake Park'
  },
  {
    id: '101',
    name: 'Jim Green',
    age: 24,
    address: 'London No. 1 Lake Park',
    children: [{
        id: '10102',
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        children: [
          {
            id: '1010200',
            name: 'Jim Green',
            age: 24,
            address: 'New York No. 1 Lake Park'
          }
        ]
      },
      ...generateMockData(50),
    ]
  },
  {
    id: '102',
    name: 'Joe Black',
    age: 30,
    address: 'Sydney No. 1 Lake Park'
  },
  {
    id: '103',
    name: 'Jon Snow',
    age: 26,
    address: 'Ottawa No. 2 Lake Park'
  }
]


// 定义一个函数用于生成模拟数据
function generateMockData(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const id = `1012${i}`;
    result.push({
      id,
      name: "我是name",
      age: 28,
      address: "我是地址"
    });
  }
  return result;
}