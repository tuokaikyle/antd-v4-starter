import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Breadcrumb, Drawer, Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  SettingOutlined,
  TagsOutlined,
  FolderOpenOutlined,
  BookOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
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

const horizontalMenuItems: MenuProps['items'] = [
  {
    icon: <SettingOutlined style={{ padding: '0px 7px 0px 17px' }} />,
    key: 'settings',
    children: [
      { label: <Link to='/settings/hello'>Hello</Link>, key: 'settings:hello' },
      { label: <Link to='/settings/world'>World</Link>, key: 'settings:world' },
    ],
  },
];

const sidebarKeys = [
  '/',
  '/users',
  '/books',
  '/books/french',
  '/books/spanish',
  '/about',
];

const breadcrumbLabels: Record<string, string> = {
  about: 'About',
  books: 'Book',
  french: 'French',
  hello: 'Hello',
  settings: 'Settings',
  spanish: 'Spanish',
  users: 'Users',
  world: 'World',
  ab: 'AB',
  cd: 'CD',
};

function getSelectedSidebarKeys(pathname: string) {
  const selectedKey = sidebarKeys
    .filter((key) =>
      key === '/'
        ? pathname === '/'
        : pathname === key || pathname.startsWith(`${key}/`)
    )
    .sort((a, b) => b.length - a.length)[0];

  return selectedKey ? [selectedKey] : [];
}

function getBreadcrumbItems(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return ['Home'];
  }

  return segments.map((segment, index) => {
    if (index > 0 && segments[index - 1] === 'users') {
      return `User ${segment}`;
    }
    return breadcrumbLabels[segment] ?? segment;
  });
}

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 767px)').matches
  );
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const selectedSidebarKeys = getSelectedSidebarKeys(currentPath);
  const breadcrumbItems = getBreadcrumbItems(currentPath);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // On desktop, toggle sidebar collapse. On mobile, toggle the drawer.
  const handleTriggerClick = () => {
    if (isMobile) {
      setDrawerVisible((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  // On mobile, close the drawer after a navigation item is selected
  const handleDrawerClose = () => setDrawerVisible(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isMobile ? 54 : 64,
            lineHeight: isMobile ? '54px' : '64px',
          }}
        >
          <div>
            <MenuOutlined
              onClick={handleTriggerClick}
              style={{ fontSize: '14px', padding: '0 22px', cursor: 'pointer' }}
              title={
                isMobile
                  ? 'Open navigation'
                  : collapsed
                    ? 'Expand sidebar'
                    : 'Collapse sidebar'
              }
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
            selectedKeys={[]}
            items={horizontalMenuItems}
            style={{
              background: 'transparent',
              borderBottom: 'none',
            }}
          />
        </Header>

        <Layout>
          {isMobile ? (
            <Drawer
              placement='left'
              width={240}
              closable={false}
              onClose={handleDrawerClose}
              open={drawerVisible}
              bodyStyle={{ padding: 0 }}
              title='Navigation'
              extra={
                <CloseOutlined
                  onClick={handleDrawerClose}
                  style={{ cursor: 'pointer', fontSize: 14 }}
                />
              }
            >
              <Menu
                theme='light'
                mode='inline'
                selectedKeys={selectedSidebarKeys}
                items={menuItems}
                onClick={handleDrawerClose}
              />
            </Drawer>
          ) : (
            <Sider
              collapsible
              trigger={null}
              breakpoint='md'
              width={240}
              collapsedWidth='60'
              collapsed={collapsed}
              style={{ background: 'white' }}
            >
              <Menu
                theme='light'
                mode='inline'
                selectedKeys={selectedSidebarKeys}
                items={menuItems}
              />
            </Sider>
          )}
          <Layout>
            <Breadcrumb style={{ margin: '16px 16px 16px 20px' }}>
              {breadcrumbItems.map((item) => (
                <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
              ))}
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
