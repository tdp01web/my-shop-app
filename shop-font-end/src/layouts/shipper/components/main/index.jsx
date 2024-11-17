import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const MainLayoutAdmin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="site-layout">
      <Layout.Content
        style={{
          padding: 24,
          margin: '0 16px',
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
export default MainLayoutAdmin;
