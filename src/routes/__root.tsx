import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {collapsed ? 'MA' : 'My App'}
        </div>
        <Menu
          theme='dark'
          mode='inline'
          selectedKeys={[currentPath]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              style={{ fontSize: '18px', padding: '0 24px', cursor: 'pointer' }}
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <MenuFoldOutlined
              style={{ fontSize: '18px', padding: '0 24px', cursor: 'pointer' }}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Dashboard
          </span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          My App ©{new Date().getFullYear()} Created with Ant Design
        </Footer>
      </Layout>
      <TanStackRouterDevtools />
    </Layout>
  );
}
