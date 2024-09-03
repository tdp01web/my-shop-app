import { Button, Form, Input, Layout, Modal, Popconfirm, Table } from "antd";
import { useState } from "react";

const { Content } = Layout;

const initialCategories = [
  { id: "1", name: "Danh mục 1", description: "Mô tả danh mục 1" },
  { id: "2", name: "Danh mục 2", description: "Mô tả danh mục 2" },
];

const ListCategoriesAdmin = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filteredCategories, setFilteredCategories] =
    useState(initialCategories);
  const [searchText, setSearchText] = useState("");

  const [form] = Form.useForm();

  const showModal = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category || { name: "", description: "" });
    setIsModalOpen(true);
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleFinish = (values) => {
    if (editingCategory) {
      const updatedCategories = categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, ...values } : cat
      );
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
    } else {
      const newCategory = { id: `${categories.length + 1}`, ...values };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories);
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = (id) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);

    setCategories(updatedCategories);

    const updatedFilteredCategories = updatedCategories.filter((category) =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCategories(updatedFilteredCategories);
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      id: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      id: "description",
    },
    {
      title: "Hành động",
      id: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa danh mục này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Content style={{ padding: "50px", marginTop: 64 }}>
        <Input
          placeholder="Tìm kiếm danh mục..."
          value={searchText}
          onChange={handleSearch}
          style={{ marginBottom: 16, width: 300 }}
        />
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={() => showModal(null)}
        >
          Thêm danh mục
        </Button>
        <Table columns={columns} dataSource={filteredCategories} />
        <Modal
          title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{ name: "", description: "" }}
          >
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên danh mục!" },
              ]}
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
      </Content>
    </Layout>
  );
};

export default ListCategoriesAdmin;
