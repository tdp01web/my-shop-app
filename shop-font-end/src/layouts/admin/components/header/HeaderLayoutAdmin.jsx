import { Button, Input, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const HeaderLayoutAdmin = () => {
  return (
    <Layout.Header
      className="header bg-primary-admin text-white h-[64px] flex items-center"
      style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-between items-center flex-1">
        <Link to="/admin" className="flex items-center gap-[12px] h-[57px] w-[57px]">
          <img src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/logo-02-20200903083638.svg" alt="logo" className="object-cover" />
          Dashboard
        </Link>
        <div className="!w-[500px] gap-x-2 flex justify-center items-center">
          <Input
            placeholder="Tìm kiếm"
            className="w-full"
            prefix={<SearchOutlined />}
          />
          <Button className='bg-black text-white'>
            <SearchOutlined />
          </Button>
        </div>
        <div>
          <Typography.Title level={5} className="!mb-0 !text-white cursor-pointer">
            Admin quản trị
          </Typography.Title>
        </div>
      </div>
    </Layout.Header>
  );
};

export default HeaderLayoutAdmin;
