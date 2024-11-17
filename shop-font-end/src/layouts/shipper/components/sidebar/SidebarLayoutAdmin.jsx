import { Layout, Menu } from 'antd';
import { items } from './SidebarRouterAdmin';

const SidebarLayoutAdmin = () => {
  return (
    <Layout.Sider width={260}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
        className="select-none"
        items={items}
      />
    </Layout.Sider>
  );
};
export default SidebarLayoutAdmin;
