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
  InfoCircleOutlined,
  UserOutlined,
  NotificationOutlined,
  MenuOutlined,
  SettingOutlined,
  TagsOutlined,
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
    key: '/about',
    icon: <InfoCircleOutlined />,
    label: <Link to='/about'>About</Link>,
  },
  {
    key: '/users',
    icon: <UserOutlined />,
    label: <Link to='/users'>Users</Link>,
  },
  {
    key: 'sub3',
    icon: <NotificationOutlined />,
    label: 'Post',
    children: [
      {
        key: '/post/csr',
        icon: <TagsOutlined />,
        label: <Link to='/post/csr'>CSR</Link>,
      },
      {
        key: '/post/ssr',
        icon: <TagsOutlined />,
        label: <Link to='/post/ssr'>SSR</Link>,
      },
      {
        key: '/post/ssg',
        icon: <TagsOutlined />,
        label: <Link to='/post/ssg'>SSG</Link>,
      },
    ],
  },
];

const profileItems: MenuItem[] = [
  {
    key: 'sub3',
    icon: <SettingOutlined />,
    label: 'Profile',
    children: [
      {
        key: '/post/csr',
        icon: <NotificationOutlined />,
        label: <Link to='/post/csr'>CSR</Link>,
      },
      {
        key: '/post/ssr',
        icon: <SettingOutlined />,
        label: <Link to='/post/ssr'>SSR</Link>,
      },
      {
        key: '/post/ssg',
        icon: <TagsOutlined />,
        label: <Link to='/post/ssg'>SSG</Link>,
        children: [
          {
            key: '/post/csr',
            icon: <NotificationOutlined />,
            label: <Link to='/post/csr'>CSR</Link>,
          },
          {
            key: '/post/ssr',
            icon: <SettingOutlined />,
            label: <Link to='/post/ssr'>SSR</Link>,
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
