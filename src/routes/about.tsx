import { createFileRoute } from '@tanstack/react-router';
import { Card, Typography, Space, Divider, Tag, Table } from 'antd';

const { Title, Paragraph, Text } = Typography;

export const Route = createFileRoute('/about')({
  component: About,
});

// Design questions considered across all versions
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
// Layout Versions
// ============================================================

const designs = {
  v1: {
    name: 'Header + Collapsible Sidebar',
    summary:
      'Header always on top of sidebar + content. Sidebar collapses to icons. Mobile: sidebar as drawer.',
    rationale:
      'Versatile admin template. Header is a natural home for logo, global actions, and settings dropdown.',
    pattern: {
      desktop: {
        sidebarOpen: ['headerAsOneRow', 'sideBarInline'],
        sidebarClosed: ['headerAsOneRow', 'menuItemsCollapseToIcons'],
      },
      mobile: {
        sidebarOpen: ['headerAsOneRow', 'sideBarAsDrawer'],
        sidebarClosed: ['headerAsOneRow'],
      },
    },
  },
  v2: {
    name: 'Full-Height Sidebar (No Header)',
    summary:
      'Desktop: no header — sidebar takes full viewport height with logo area on top. Mobile: same header+drawer as v1.',
    rationale:
      'Modern, content-first layout. More vertical space. Settings lives in the sidebar. Logo+trigger share a compact area at the top of the sidebar.',
    pattern: {
      desktop: {
        sidebarOpen: [
          'noHeader',
          'sideBarFullHeight',
          'logoAreaInSidebar',
          'settingsInSidebar',
        ],
        sidebarClosed: [
          'noHeader',
          'menuItemsCollapseToIcons',
          'logoAreaCollapsesToTrigger',
        ],
      },
      mobile: {
        sidebarOpen: [
          'headerAsOneRow',
          'sideBarAsDrawer',
          'settingsInHeaderDropdown',
        ],
        sidebarClosed: ['headerAsOneRow'],
      },
    },
  },
};

function About() {
  const versionEntries = Object.entries(designs) as [
    string,
    (typeof designs)['v1'],
  ][];

  const matrixColumns = [
    { title: 'Screen', dataIndex: 'screen', key: 'screen', width: 90 },
    { title: 'State', dataIndex: 'state', key: 'state', width: 80 },
    {
      title: 'Behaviors',
      dataIndex: 'behaviors',
      key: 'behaviors',
      render: (tags: string[]) => (
        <Space size={[0, 4]} wrap>
          {tags.map((tag) => (
            <Tag color='blue' key={tag}>
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  function buildMatrixData(
    version: string,
    pattern: (typeof designs)['v1']['pattern']
  ) {
    return [
      {
        key: `${version}-do`,
        screen: 'Desktop',
        state: 'Open',
        behaviors: pattern.desktop.sidebarOpen,
      },
      {
        key: `${version}-dc`,
        screen: 'Desktop',
        state: 'Closed',
        behaviors: pattern.desktop.sidebarClosed,
      },
      {
        key: `${version}-mo`,
        screen: 'Mobile',
        state: 'Open',
        behaviors: pattern.mobile.sidebarOpen,
      },
      {
        key: `${version}-mc`,
        screen: 'Mobile',
        state: 'Closed',
        behaviors: pattern.mobile.sidebarClosed,
      },
    ];
  }

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

      <Card>
        <Title level={3}>Layout Design Thinking</Title>
        <Paragraph type='secondary'>
          This page documents the layout design decisions and tradeoffs across
          versions. Currently running <Tag color='green'>v2</Tag>.
        </Paragraph>

        {/* ---- Versions Overview ---- */}
        {versionEntries.map(([version, design]) => (
          <div key={version} style={{ marginBottom: 32 }}>
            <Title level={4}>
              <Tag style={{ fontSize: 16 }}>{version.toUpperCase()}</Tag>
              {design.name}
            </Title>
            <Paragraph style={{ marginBottom: 4 }}>
              <Text strong>What:</Text> {design.summary}
            </Paragraph>
            <Paragraph type='secondary'>
              <Text strong>Why:</Text> {design.rationale}
            </Paragraph>

            <Table
              columns={matrixColumns}
              dataSource={buildMatrixData(version, design.pattern)}
              pagination={false}
              size='small'
              bordered
              style={{ marginTop: 8 }}
            />
          </div>
        ))}

        <Divider />

        {/* ---- Questions Considered ---- */}
        <Title level={5}>Design Questions</Title>
        {Object.entries(issuesToConsider).map(([category, questions]) => (
          <div key={category} style={{ marginBottom: 8 }}>
            <Text strong style={{ textTransform: 'capitalize' }}>
              {category}
            </Text>
            <ul style={{ marginTop: 2, paddingLeft: 20 }}>
              {questions.map((q, i) => (
                <li key={i}>
                  <Text type='secondary'>{q}</Text>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </Space>
  );
}
