import { createFileRoute } from '@tanstack/react-router';
import { Card, Typography, Space, Divider, Tag, Table } from 'antd';

const { Title, Paragraph, Text } = Typography;

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

// ============================================================
// Current Implementation (v1) – "Header + Collapsible Sidebar"
// ============================================================
// Chosen for being the safest, most versatile starting point
// for an admin/dashboard template.

const currentDesign = {
  name: 'v1 – Header + Collapsible Sidebar',

  decisions: {
    sidebar: {
      chosen: 'Sidebar sits below a full-width header (not a standalone column).',
      rationale:
        'A full-width header provides natural space for logo, global actions (search, notifications, user menu), and breadcrumbs — things nearly every real app needs. A sidebar-as-column would restrict horizontal space for these.',
    },
    header: {
      chosen: 'Header as one row, always on top of sidebar + content.',
      rationale:
        'Omitting the header ("no header" trend) saves vertical space but removes a universal place for global controls. For a template that must accommodate unknown use cases, keeping the header is the safer default.',
    },
    sidebarIcons: {
      chosen: 'Yes — every menu item has an icon. Icons remain visible when collapsed.',
      rationale:
        'When the sidebar is collapsed to 60px, icons are the only visual anchor. Without them, users would see empty rectangles. Ant Design handles the icon-only view automatically in inline mode.',
    },
    sidebarTrigger: {
      chosen: 'Inside the header (hamburger icon), not inside the sidebar.',
      rationale:
        'If the trigger were inside a closed sidebar, it would be invisible. Placing it in the header guarantees it is always accessible regardless of sidebar state.',
    },
    mobileBehavior: {
      chosen: 'Sidebar becomes an antd Drawer overlay on screens < 768px.',
      rationale:
        'At ~375px viewport width, a persistent 240px sidebar consumes 64% of the screen — unacceptable for content. A drawer overlay gives content the full viewport by default, with navigation one tap away. This is the pattern used by YouTube, GitHub, Vercel, and Ant Design Pro.',
    },
  },

  // Behavior matrix across screen sizes × sidebar states
  pattern: {
    desktop: {
      sidebarOpen: ['headerAsOneRow', 'sideBarInline', 'iconsVisible', 'tooltipsNotNeeded'],
      sidebarClosed: ['headerAsOneRow', 'menuItemsCollapseToIcons', 'tooltipsOnHover'],
    },
    mobile: {
      sidebarOpen: ['headerAsOneRow', 'sideBarAsDrawer'],
      sidebarClosed: ['headerAsOneRow'],
    },
  },

};

function About() {
  const patternColumns = [
    {
      title: 'Screen',
      dataIndex: 'screen',
      key: 'screen',
      width: 100,
    },
    {
      title: 'Sidebar State',
      dataIndex: 'state',
      key: 'state',
      width: 140,
    },
    {
      title: 'Behaviors',
      dataIndex: 'behaviors',
      key: 'behaviors',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color='blue' key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  const patternData = [
    {
      key: '1',
      screen: 'Desktop',
      state: 'Open',
      behaviors: currentDesign.pattern.desktop.sidebarOpen,
    },
    {
      key: '2',
      screen: 'Desktop',
      state: 'Closed',
      behaviors: currentDesign.pattern.desktop.sidebarClosed,
    },
    {
      key: '3',
      screen: 'Mobile',
      state: 'Open',
      behaviors: currentDesign.pattern.mobile.sidebarOpen,
    },
    {
      key: '4',
      screen: 'Mobile',
      state: 'Closed',
      behaviors: currentDesign.pattern.mobile.sidebarClosed,
    },
  ];

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

      {/* ---- Design Thinking ---- */}
      <Card>
        <Title level={3}>
          Layout Design Thinking — {currentDesign.name}
        </Title>
        <Paragraph type='secondary'>
          This page documents the layout design decisions behind this template.
          The goal is to make tradeoffs explicit and provide a clear rationale
          for each choice, so future variants (v2, v3, ...) can be compared
          against a known baseline.
        </Paragraph>

        <Divider orientation='left'>Questions Considered</Divider>
        {Object.entries(issuesToConsider).map(([category, questions]) => (
          <div key={category} style={{ marginBottom: 16 }}>
            <Text strong style={{ textTransform: 'capitalize' }}>
              {category}
            </Text>
            <ul style={{ marginTop: 4, paddingLeft: 20 }}>
              {questions.map((q, i) => (
                <li key={i}>
                  <Text>{q}</Text>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Divider orientation='left'>Decisions & Rationale</Divider>
        {Object.entries(currentDesign.decisions).map(([key, decision]) => (
          <div key={key} style={{ marginBottom: 20 }}>
            <Text strong style={{ textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Text>
            <Paragraph style={{ margin: '4px 0 0 0' }}>
              <Tag color='green'>Chosen</Tag> {decision.chosen}
            </Paragraph>
            <Paragraph type='secondary' style={{ margin: '4px 0 0 0' }}>
              Why: {decision.rationale}
            </Paragraph>
          </div>
        ))}

        <Divider orientation='left'>Behavior Matrix</Divider>
        <Paragraph type='secondary'>
          How the layout behaves across screen sizes and sidebar states:
        </Paragraph>
        <Table
          columns={patternColumns}
          dataSource={patternData}
          pagination={false}
          size='small'
          bordered
        />


      </Card>
    </Space>
  );
}
