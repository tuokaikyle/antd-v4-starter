import { createFileRoute } from '@tanstack/react-router';
import { Card, Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <Space direction='vertical' size='large' style={{ width: '100%' }}>
      <Card>
        <Title level={2}>About Us</Title>
        <Paragraph>
          This is a demo application built with React, TypeScript, TanStack
          Router, and Ant Design.
        </Paragraph>
        <Paragraph>
          TanStack Router provides type-safe routing with excellent developer
          experience, while Ant Design offers a comprehensive set of
          high-quality React components.
        </Paragraph>
      </Card>
    </Space>
  );
}
