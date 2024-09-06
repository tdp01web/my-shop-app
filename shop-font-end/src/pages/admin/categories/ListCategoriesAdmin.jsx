// ListCategoriesAdmin.jsx
import { Button, Layout, Popconfirm, Table } from "antd";
import { useState } from "react";
import SearchBar from "./component/SearchBar";
import AddEditCategory from "./component/AddEditCategory";

const { Content } = Layout;

const category = [
  { id: "1", name: "Danh mục 1", description: "Mô tả danh mục 1" },
  { id: "2", name: "Danh mục 2", description: "Mô tả danh mục 2" },
];

const ListCategoriesAdmin = () => {
  const [categories, setCategories] = useState(category);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState(category);
  const [searchText, setSearchText] = useState("");

  const showModal = (category) => {
    setEditingCategory(category);
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
  };

  const handleDelete = (id) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setCategories(updatedCategories);
    setFilteredCategories(
      updatedCategories.filter((category) =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
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
        <SearchBar value={searchText} onChange={handleSearch} />
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={() => showModal(null)}
        >
          Thêm danh mục
        </Button>
        <Table columns={columns} dataSource={filteredCategories} rowKey="id" />
        <AddEditCategory
          visible={isModalOpen}
          onCancel={handleCancel}
          onFinish={handleFinish}
          editingCategory={editingCategory}
        />
      </Content>
    </Layout>
  );
};

export default ListCategoriesAdmin;
