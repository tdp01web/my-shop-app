import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select, Upload } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePutCategory } from "../../../../hooks/mutations/usePutCategories";
import { useGetCategoryByID } from "../../../../hooks/queries/useGetCategoriesByID";

const EditCategory = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetCategoryByID(id,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    })
  const { mutate, isPending } = usePutCategory(id, {
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Sửa danh mục thành công",
      });
      setTimeout(() => {
        navigate('/admin/category');
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["get-all-category"],
      });
    },
    onError(error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        if (message.includes("duplicate key error")) {
          messageApi.open({
            type: "error",
            content: "Danh mục đã tồn tại. Vui lòng chọn tên khác.",
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
        <h1 className="font-semibold text-2xl">Chi tiết danh mục</h1>
        <Button type="primary">
          <Link to="/admin/category">
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
          initialValues={data?.data}
          autoComplete="off"
          disabled={isPending}
        >
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{
              required: true, message: "Tên danh mục bắt buộc phải điền",
              max: 32, message: "Vui lòng nhập tên danh mục nhỏ hơn 32 kí tự"
            }]}
          >
            <Input />
          </Form.Item>
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

export default EditCategory;
