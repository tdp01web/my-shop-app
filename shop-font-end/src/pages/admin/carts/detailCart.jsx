import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select, Upload } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrderByID } from "../../../hooks/queries/useGetOrderByID";
import { usePutOrder } from "../../../hooks/mutations/usePutOrder";

const DetailCart = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const options = [
    { value: "Đang Xử Lý", label: "Đang Xử Lý" },
    { value: "Đã Xác Nhận", label: "Đã Xác Nhận" },
    { value: "Đang Đóng Gói", label: "Đang Đóng Gói" },
    { value: "Đang Giao Hàng", label: "Đang Giao Hàng" },
    { value: "Đã Giao Hàng", label: "Đã Giao Hàng" },
    { value: "Đã Hủy", label: "Đã Hủy" },
  ];
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
  const { mutate, isPending, isError: isErrorPut } = usePutOrder(
    id,
    {
      onSuccess: () => {
        messageApi.success("Cập nhật trạng thái thành công");
        navigate('/admin/carts')
        queryClient.invalidateQueries({
          queryKey: ["get-all-orders"],
        })
      },
      onError: () => {
        messageApi.error("Cập nhật trạng thái thất bại");
      },
    })
  const onFinish = (values) => {
    console.log({orderStatus: values.orderStatus})
    mutate({orderStatus: values.orderStatus});
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
          initialValues={{
            _id: data?.data._id,
            products: data?.data.products.map((product) => product.title),
            totalProductPrice: data?.data.totalProductPrice,
            shippingFee: data?.data.shippingFee,
            totalPrice: data?.data.totalPrice,
            paymentMethod: data?.data.paymentMethod,
            paymentStatus: data?.data.paymentStatus,
            orderStatus: data?.data.orderStatus
          }}
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
            name="products"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Giá sản phẩm"
            name="totalProductPrice"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Giá ship"
            name="shippingFee"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Tổng giá trị đơn hàng"
            name="totalPrice"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Phương thức thanh toán"
            name="paymentMethod"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Tình trạng thanh toán"
            name="paymentStatus"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Tình trạng thanh toán"
            name="paymentStatus"
          >
            <Input className="disabled:cursor-not-allowed pointer-events-none border-none" />
          </Form.Item>
          <Form.Item
            label="Trạng thái đơn hàng"
            name="orderStatus"
          >
            <Select
              showSearch
              placeholder="Trạng thái đơn hàng"
              optionFilterProp="label"
              options={options}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
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

export default DetailCart;
