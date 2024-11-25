import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePutVouchers } from "../../../../hooks/mutations/usePutVouchers";
import { useQueryClient } from "@tanstack/react-query";
import { useGetVouchersByID } from "../../../../hooks/queries/useGetVouchersById";
import moment from "moment";

const EditVouchers = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useGetVouchersByID(id,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    })
  const { mutate, isPending } = usePutVouchers(id, {
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Sửa vouchers thành công",
      });
      setTimeout(() => {
        navigate('/admin/vouchers');
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["get-all-vouchers"],
      });
    },
    onError(error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        if (message.includes("duplicate key error")) {
          messageApi.open({
            type: "error",
            content: "Vouchers đã tồn tại. Vui lòng chọn tên khác.",
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
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>
  return (
    <div className="">
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Chi tiết vouchers</h1>
        <Button type="primary">
          <Link to="/admin/vouchers">
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
          autoComplete="off"
          initialValues={{
            name: data?.data.name,
            discount: data?.data.discount,
            maxDiscountAmount: data?.data.maxDiscountAmount,
            startDate: moment(data?.data.startDate),
            expiry: moment(data?.data.expiry),
            masUses: data?.data?.maxUses
          }}
          disabled={isPending}
        >
          <Form.Item
            label="Tên mã giảm giá"
            name="name"
            rules={[{ required: true, message: "Tên mã giảm giá là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số tiền giảm"
            name="discount"
            rules={[
              { required: true, message: "Số tiền giảm là bắt buộc!" },
              { type: 'number', min: 0, message: "Số tiền giảm phải lớn hơn hoặc bằng 0!" }
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Số tiền giảm tối đa"
            name="maxDiscountAmount"
            rules={[
              { required: true, message: "Số tiền giảm tối đa là bắt buộc!" },
              { type: 'number', min: 0, message: "Số tiền giảm tối đa phải lớn hơn hoặc bằng 0!" }
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Số lần sử dụng"
            name="maxUses"
            rules={[
              { required: true, message: "Số tiền giảm tối đa là bắt buộc!" },
              { type: 'number', min: 0, message: "Số tiền giảm tối đa phải lớn hơn hoặc bằng 0!" }
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={[{ required: true, message: "Ngày bắt đầu là bắt buộc!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="Ngày hết hạn"
            name="expiry"
            rules={[{ required: true, message: "Ngày hết hạn là bắt buộc!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
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

export default EditVouchers;
