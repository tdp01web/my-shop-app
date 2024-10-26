import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select, Upload } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrderByID } from "../../../hooks/queries/useGetOrderByID";

const DetailCart = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetOrderByID(
    id,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    })

  const onFinish = (values) => {
    mutate(values);
  };
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>

  return (
    <div className="">
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Chi tiết đơn hàng</h1>
        <Button type="primary">
          <Link to="/admin/carts">
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
          initialValues={data?.data}
          autoComplete="off"
        >
          <Form.Item
            label="Mã đơn hàng"
            name="_id"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Sản phẩm"
            name="_id"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Tổng giá sản phẩm"
            name="_id"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Giá ship"
            name="_id"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DetailCart;
