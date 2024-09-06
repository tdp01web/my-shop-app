// AddEditCategory.jsx
import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
/* eslint-disable react/prop-types */
const AddEditCategory = ({ visible, onCancel, onFinish, editingCategory }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue(editingCategory);
    } else {
      form.resetFields();
    }
  }, [editingCategory, form]);

  return (
    <Modal
      title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingCategory ? "Cập nhật" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditCategory;
