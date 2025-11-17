import { createFileRoute, Link } from '@tanstack/react-router';
import { Table, Tag, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface User {
  key: string;
  id: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const data: User[] = [
  {
    key: '1',
    id: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['admin', 'developer'],
  },
  {
    key: '2',
    id: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['user'],
  },
  {
    key: '3',
    id: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['developer'],
  },
];

export const Route = createFileRoute('/users/')({
  component: Users,
});

function Users() {
  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            const color = tag === 'admin' ? 'red' : 'blue';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link to='/users/$userId' params={{ userId: record.id }}>
            <Button type='link'>View</Button>
          </Link>
          <Button type='link'>Edit</Button>
          <Button type='link' danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Users</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
