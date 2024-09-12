import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../../../config/instance";

const AddCategory = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (category) => {
      try {
        const { data } = await instance.post(
          `/category/createCategory`,
          category
        );
        console.log(data);

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thêm danh mục thành công",
      });
      setTimeout(() => {
        navigate("/admin/categories");
      }, 1000);
      form.resetFields();
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };
  return (
    <div className="">
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Thêm danh muc</h1>
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
            label="Tên sản phẩm"
            name="title"
            rules={[
              { required: true, message: "Tên sản phẩm bắt buộc phải điền" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loading3QuartersOutlined className="mr-2 animate-spin" />
                  Submit
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCategory;
