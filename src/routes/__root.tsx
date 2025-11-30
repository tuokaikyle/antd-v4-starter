import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Breadcrumb, Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  SettingOutlined,
  TagsOutlined,
  FolderOpenOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import type { MenuProps } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to='/'>Home</Link>,
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: <Link to='/users'>Users</Link>,
  },
  {
    key: '/books',
    icon: <BookOutlined />,
    label: 'Book',
    children: [
      {
        key: '/books/french',
        icon: <TagsOutlined />,
        label: <Link to='/books/french'>French</Link>,
      },
      {
        key: '/books/spanish',
        icon: <TagsOutlined />,
        label: <Link to='/books/spanish'>Spanish</Link>,
      },
    ],
  },
  {
    key: '/about',
    icon: <FolderOpenOutlined />,
    label: <Link to='/about'>About</Link>,
  },
];

const profileItems: MenuItem[] = [
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
    children: [
      {
        key: '/settings/hello',
        label: <Link to='/settings/hello'>Hello</Link>,
      },
      {
        key: '/settings/world',
        label: 'World',
        children: [
          {
            key: '/settings/world/ab',
            label: <Link to='/settings/world/ab'>AB</Link>,
          },
          {
            key: '/settings/world/cd',
            label: <Link to='/settings/world/cd'>CD</Link>,
          },
        ],
      },
    ],
  },
];

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [collapsed, setCollapsed] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: 'white',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <MenuOutlined
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              style={{ fontSize: '18px', padding: '0 30px', cursor: 'pointer' }}
            />
            <span
              style={{
                fontSize: '18px',
                background: '#d9f7be',
                color: '#52c41a',
                fontWeight: 'bold',
                padding: '8px',
              }}
            >
              Antd starter
            </span>
          </div>

          <Menu
            mode='horizontal'
            style={{ paddingInline: '8px' }}
            items={profileItems}
          ></Menu>
        </Header>

        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ background: 'white' }}
          >
            <Menu
              theme='light'
              mode='inline'
              selectedKeys={[currentPath]}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Breadcrumb style={{ margin: '16px' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                margin: '0 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>

        <Footer style={{ textAlign: 'center' }}>
          My App ©{new Date().getFullYear()} Created with Ant Design
        </Footer>
      </Layout>
      <TanStackRouterDevtools />
    </Layout>
  );
}
