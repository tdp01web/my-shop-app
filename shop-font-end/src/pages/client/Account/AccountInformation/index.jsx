import { Form, Radio, Input, Button, DatePicker } from "antd";

const AccountInformation = () => {
  return (
    <>
      <h2 className="text-[24px] font-semibold px-6 py-4 text-[#333] leading-tight">
        Thông tin tài khoản
      </h2>

      <Form
        className="px-6 py-4 max-w-[580px]"
        labelCol={{ span: 8 }}
        size="large"
      >
        <Form.Item
          name="name"
          label={<p className="text-[16px]">Họ Tên</p>}
          className="mb-3"
        >
          <Input placeholder="Họ Tên" className="rounded" />
        </Form.Item>

        <Form.Item
          name="gender"
          label={<p className="text-[16px]">Giới tính</p>}
          className="mb-3"
        >
          <Radio.Group>
            <Radio value={0}>Nam</Radio>

            <Radio value={1}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="phone"
          label={<p className="text-[16px]">Số điện thoại</p>}
        >
          <Input placeholder="Số điện thoại" className="rounded" />
        </Form.Item>

        <Form.Item name="email" label={<p className="text-[16px]">Email</p>}>
          <Input placeholder="Email" className="rounded" />
        </Form.Item>

        <Form.Item
          name="birthday"
          label={<p className="text-[16px]">Ngày sinh</p>}
        >
          <DatePicker placeholder="Ngày sinh" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button className="uppercase rounded text-[14px] bg-[#e30019] text-white !border-[#e30019]">
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AccountInformation;
