import { useMutation } from "@tanstack/react-query";
import { Form, Input, message, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import { instance } from "../../../../../configs/instance";

// eslint-disable-next-line react/prop-types
const CancelOrderModal = ({ open, onClose, orderId, refetch }) => {
  const [form] = Form.useForm();

  const { mutate } = useMutation({
    mutationKey: ["CANCEL_MY_ORDER"],
    mutationFn: ({ cancelReason }) => {
      return instance.put(`/order/my-orders/cancel/${orderId}`, {
        cancelReason,
      });
    },
    onSuccess: () => {
      message.success("Huỷ đơn hàng thành công");
      onCloseModal();
      refetch();
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại"
      );
    },
  });

  const onCloseModal = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Xác nhận huỷ đơn hàng"
      open={open}
      onCancel={onCloseModal}
      cancelText="Huỷ"
      okText="Xác nhận"
      okButtonProps={{
        onClick: form.submit,
      }}
    >
      <Form form={form} onFinish={mutate} layout="vertical" className="my-4">
        <FormItem
          name="cancelReason"
          label="Lý do huỷ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lý do huỷ đơn hàng",
            },
          ]}
        >
          <Input placeholder="Nhập lý do" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CancelOrderModal;
