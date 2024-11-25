import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Select, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { usePostCategory } from "../../../../hooks/mutations/usePostCategory";

const AddCategory = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { mutate, isPending } = usePostCategory({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thêm danh mục thành công",
      });
      setTimeout(() => {
        navigate('/admin/categories');
      }, 1000);
      form.resetFields();
    },
    onError(error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        if (message.includes("duplicate key error")) {
          messageApi.open({
            type: "error",
            content: "Danh mục đã tồn tại. Vui lòng chọn tên khác.",
          });
        } else {
          messageApi.open({
            type: "error",
            content: message,
          });
        }
      } else {
        messageApi.open({
          type: "error",
          content: "Đã xảy ra lỗi. Vui lòng thử lại.",
        });
      }
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };
  return (
    <div className="">
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Thêm danh mục</h1>
        <Button type="primary">
          <Link to="/admin/categories">
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
          disabled={isPending}
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{
              required: true, message: "Tên danh mục bắt buộc phải điền",
              max: 32, message: "Vui lòng nhập tên danh mục nhỏ hơn 32 kí tự"
            }]}
          >
            <Input placeholder="Nhập danh mục" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loading3QuartersOutlined className="mr-2 animate-spin" />
                  Cập nhật
                </>
              ) : (
                "Cập nhật"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCategory;
