import { createFileRoute } from '@tanstack/react-router';
import { Card, Descriptions, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/users/$userId')({
  component: UserDetail,
});

function UserDetail() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <Space direction='vertical' size='large' style={{ width: '100%' }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate({ to: '/users' })}
      >
        Back to Users
      </Button>

      <Card title={`User Details - ID: ${userId}`}>
        <Descriptions bordered>
          <Descriptions.Item label='User ID'>{userId}</Descriptions.Item>
          <Descriptions.Item label='Name'>John Brown</Descriptions.Item>
          <Descriptions.Item label='Email'>john@example.com</Descriptions.Item>
          <Descriptions.Item label='Phone'>555-1234</Descriptions.Item>
          <Descriptions.Item label='Address' span={2}>
            New York No. 1 Lake Park
          </Descriptions.Item>
          <Descriptions.Item label='Status'>
            <Button type='primary' size='small'>
              Active
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
}
