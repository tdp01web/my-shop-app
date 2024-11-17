import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select, Upload } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetOrderByID } from "../../../hooks/queries/useGetOrderByID";
import { usePutOrder } from "../../../hooks/mutations/usePutOrder";
import { useEffect, useState } from "react";

const DetailCartStaff = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [cancellationReason, setCancellationReason] = useState("");

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
  const { mutate, isPending, isError: isErrorPut, error } = usePutOrder(
    id,
    {
      onSuccess: () => {
        messageApi.success("Cập nhật trạng thái thành công");
        queryClient.invalidateQueries({
          queryKey: ["get-all-orders"],
        })
        setTimeout(() => {
          navigate('/admin/carts')
        }, 500)
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi!";
        messageApi.error(errorMessage);
      },
    })
  const onFinish = (values) => {
    mutate({
      orderStatus: values.orderStatus,
      cancellationReason: values.cancellationReason
    });
  };
  const handleValuesChange = (changedValues) => {
    if (changedValues === "Đã Hủy") {
      setCancellationReason("Đã Hủy");
    } else {
      setCancellationReason("");
    }
  }

  useEffect(() => {
    if (data?.data.orderStatus) {
      setCancellationReason("Đã Hủy");
    }
  }, [data?.data.orderStatus])
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
          form={form}
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
            orderStatus: data?.data.orderStatus,
            cancellationReason: data?.data.cancellationReason
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Mã đơn hàng"
            name="_id"
          >
            <Input className="border-none disabled:cursor-not-allowed pointer-events-none" />
          </Form.Item>
          <Form.Item
            label="Sản phẩm"
            name="products"
          >
            <Input className="border-none disabled:cursor-not-allowed pointer-events-none" />
          </Form.Item>
          <Form.Item
            label="Giá sản phẩm"
            name="totalProductPrice"
          >
            <Input className="border-none disabled:cursor-not-allowed pointer-events-none" />
          </Form.Item>
          <Form.Item
            label="Giá ship"
            name="shippingFee"
          >
            <Input className="border-none disabled:cursor-not-allowed pointer-events-none" />
          </Form.Item>
          <Form.Item
            label="Tổng giá trị đơn hàng"
            name="totalPrice"
          >
            <Input className="border-none disabled:cursor-not-allowed pointer-events-none" />
          </Form.Item>
          <Form.Item
            label="Phương thức thanh toán"
            name="paymentMethod"
          >
            <Input className="border-none disabled:cursor-not-allowed pointer-events-none" />
          </Form.Item>
          <Form.Item
            label="Tình trạng thanh toán"
            name="paymentStatus"
          >
            <Input className="border-none disabled:cursor-not-allowed pointer-events-none" />
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
              onChange={handleValuesChange}
            />
          </Form.Item>
          {cancellationReason === "Đã Hủy" ? (
            <Form.Item
              label="Lý do hủy"
              name="cancellationReason"
              rules={[{ required: true, message: "Lý do hủy bắt buộc phải điền" }]}
            >
              <Input
                placeholder="Nhập lý do hủy"
              />
            </Form.Item>
          ) : null}
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

export default DetailCartStaff;
