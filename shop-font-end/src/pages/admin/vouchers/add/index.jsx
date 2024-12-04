import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { usePostBrand } from "../../../../hooks/mutations/usePostBrand";
import { usePostVouchers } from "../../../../hooks/mutations/usePostVouchers";

const AddVouchers = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { mutate, isPending } = usePostVouchers({
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thêm vouchers thành công",
      });
      setTimeout(() => {
        navigate('/admin/vouchers');
      }, 1000);
      form.resetFields();
    },
    onError(error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        if (message.includes("duplicate key error")) {
          messageApi.open({
            type: "error",
            content: "Vouchers đã tồn tại vui lòng nhập vouchers khác",
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
        <h1 className="font-semibold text-2xl">Thêm vouchers</h1>
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
          disabled={isPending}
        >
          <Form.Item
            label="Tên mã giảm giá"
            name="name"
            rules={[{ required: true, message: "Tên mã giảm giá là bắt buộc!" }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Số tiền giảm"
            name="discount"
            rules={[
              { required: true, message: "Số tiền giảm là bắt buộc!" },
              { type: 'number', min: 0, message: "Số tiền giảm phải lớn hơn hoặc bằng 0!" }
            ]}
          >
            <InputNumber />
          </Form.Item> */}

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
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Ngày hết hạn"
            name="expiry"
            rules={[{ required: true, message: "Ngày hết hạn là bắt buộc!" }]}
          >
            <DatePicker />
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

export default AddVouchers;
