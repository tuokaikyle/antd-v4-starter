import { createFileRoute } from '@tanstack/react-router';
import { Card, Row, Col, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  UserOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title='Active Users'
              value={1128}
              prefix={<UserOutlined />}
              suffix='users'
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title='Revenue'
              value={93}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix='%'
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title='Orders'
              value={256}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
