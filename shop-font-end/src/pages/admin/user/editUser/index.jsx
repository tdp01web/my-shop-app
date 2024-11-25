import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Divider, Form, Input, InputNumber, message, Select, Space, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useGetUserByID } from "../../../../hooks/queries/useGetUserById";
import { usePutUser } from "../../../../hooks/mutations/usePutUser";

const EditUser = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user.role === "Owner"
  const [items, setItems] = useState(['Admin', 'Staff', 'Shipper', 'User']);
  const roleAdmin = ['Staff', 'Shipper', 'User'];
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const optionRoleAdmin = roleAdmin.map((item) => ({
    value: item,
    label: item
  }))

  const { data, isLoading, isError } = useGetUserByID(
    id,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    })
  const right = JSON.parse(localStorage.getItem("user"));
  const isRight = data?.data._id === right._id;
  const { mutate, isPending } = usePutUser(
    id,
    {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Sửa tài khoản thành công",
        });
        setTimeout(() => {
          navigate('/admin/users');
        }, 500);
        queryClient.invalidateQueries({ queryKey: ["get-all-user"] });
      },
      onError(error) {
        if (error.response?.data) {
          const { message } = error.response.data;
          if (message.includes("duplicate key error")) {
            messageApi.open({
              type: "error",
              content: "Thông tin tài khoản đã tồn tại. Vui lòng kiểm tra lại tài khoản.",
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


  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data.</p>
  return (
    <div className="">
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Chi tiết tài khoản</h1>
        <Button type="primary">
          <Link to="/admin/users">
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
          initialValues={data?.data}
          autoComplete="off"
          disabled={isPending}
        >
          <Form.Item
            label="Họ"
            name="firstName"
            rules={[{ required: true, message: "Tên tài khoản bắt buộc phải điền" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="lastName"
            rules={[{ required: true, message: "Tên tài khoản bắt buộc phải điền" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Giá sản phẩm bắt buộc phải điền" },
            {
              type: "email",
              message: "Mời nhập đúng định dạng email"
            }
            ]}
          >
            <Input />
          </Form.Item>
          {isRight ?
            <Form.Item
              label="Mật khấu"
              name="password"
              rules={[{ required: true, message: "Mật khẩu bắt buộc phải điền" }]}
            >
              <Input.Password />
            </Form.Item> : null}
          <Form.Item
            label="Số điện thoại"
            name="mobile"
            rules={[{ required: true, message: "Mật khẩu bắt buộc phải điền" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
          >
            <Input />
          </Form.Item>
          {isRight ? null : <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Mật khẩu bắt buộc phải điền" }]}
          >
            {isOwner ? <Select
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space style={{ padding: '0 8px 4px' }}>
                    <Input
                      placeholder="Vai trò"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()

                      }
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                      Thêm mới
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({ label: item, value: item }))}
            /> :
              <Select
                showSearch
                optionFilterProp="role"
                options={optionRoleAdmin}
              />}

          </Form.Item>}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loading3QuartersOutlined className="mr-2 animate-spin" />
                  Cập nhật
                </>
              ) : (
                "Cập nhật"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;