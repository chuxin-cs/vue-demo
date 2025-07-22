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
    children: [
      ...generateMockData(100),
      {
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
      }
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
  const names = ['John Brown', 'Joe Black', 'Jim Green', 'Jon Snow'];
  const addresses = [
    'New York No. 1 Lake Park',
    'London No. 1 Lake Park',
    'Sydney No. 1 Lake Park',
    'Ottawa No. 2 Lake Park'
  ];
  const result = [];

  for (let i = 0; i < count; i++) {
    const id = `1010${i}`;
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomAge = Math.floor(Math.random() * 20) + 18; // 随机生成18 - 37岁的年龄
    const randomAddressIndex = Math.floor(Math.random() * addresses.length);

    result.push({
      id,
      name: names[randomNameIndex],
      age: randomAge,
      address: addresses[randomAddressIndex]
    });
  }

  return result;
}