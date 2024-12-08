import { Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";

const CancelOrderModal = ({ open, onClose, onOk, loading }) => {
  const [form] = Form.useForm();

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
        loading,
      }}
    >
      <Form form={form} onFinish={onOk} layout="vertical" className="my-4">
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
