import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../../configs/instance";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { data: product, isError, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        return await instance.get(`/product/getaProduct/${id}`);
      } catch (error) {
        throw new Error(`Lấy sản phẩm thất bại`);
      }
    },
  });
  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: async (product) => {
      try {
        return await instance.put(`/products/${id}`, product);
      } catch (error) {
        throw new Error(`Cập nhật sản phẩm thất bại`);
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật sản phẩm thành công",
      });
      setTimeout(() => {
        navigate('/admin/products');
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
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
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Đã có lỗi xảy ra</div>;
  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Chỉnh sửa sản phẩm</h1>
        <Button type="primary">
          <Link to="/admin/products">
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
            label="Tên tài khoản"
            name="title"
            rules={[{ required: true, message: "Tên tài khoản bắt buộc phải điền" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Giá sản phẩm bắt buộc phải điền" },
            {
              type: "email",
              message: "Mời nhập đúng định dạng email"
            }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Mật khẩu bắt buộc phải điền" }]}
          >
            <Input />
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

export default EditUser;
