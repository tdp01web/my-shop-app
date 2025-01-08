import { BackwardFilled } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const EditBrands = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Chi tiết hãng</h1>
        <Button type="primary">
          <Link to="/admin/brands">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <div className="mx-auto max-w-3xl">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên hãng"
            name="title"
            rules={[{
              required: true, message: "Tên hãng bắt buộc phải điền",
              max: 32, message: "Vui lòng nhập tên hãng nhỏ hơn 32 kí tự"
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditBrands;
