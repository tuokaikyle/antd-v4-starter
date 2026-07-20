import { createFileRoute } from '@tanstack/react-router';
import { Card, Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

export const Route = createFileRoute('/about')({
  component: About,
});

const issuesToConsider = {
  sidebar: [
    'sidebar always has header on top of it. classic, but not many websites do this now',
    'sidebar as a drawer - youtube is using it. the sidebar trigger is in the header logo',
    'as a whole column that contains website logo',
    'on mobile - sidebar as bottom navigation bar, used by youtube and instagram',
  ],
  header: [
    'the classic design is - header as one row and it is always on top of the sidebar and content',
    'header as one row, it can open the side bar as a drawer, or just open side bar below the header',
    'but no header is the trend now, because it gives more space for the content',
  ],
  sidebarIcons: [
    'are they needed? do they still appear when the sidebar is closed?',
  ],
  sidebarTrigger: [
    'where to put it? inside the sidebar, or inside the header?',
    'if inside side bar, and the sidebar is closed, then the menu items must collapse to icons, and the trigger must be inside the sidebar so that the trigger is always visible',
  ],
  general: [
    'always think about screen sizes and side bar open/closed states to reason the design',
  ],
};

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
