import { BackwardFilled, Loading3QuartersOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../../config/instance";

const CategoryEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      try {
        const { data } = await instance.get(`/category/getCategory/${id}`);
        console.log(data);

        return data;
      } catch (error) {
        throw new Error(`Lấy danh muc thất bại`);
      }
    },
  });
  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: async (category) => {
      try {
        const { data } = await instance.put(
          `/category/updateCategory/${id}`,
          category
        );
        console.log(data);

        return data;
      } catch (error) {
        throw new Error(`Cập nhật damh muc thất bại`);
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật damh muc thành công",
      });
      setTimeout(() => {
        navigate("/admin/categories");
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Đã có lỗi xảy ra</div>;
  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Chỉnh sửa damh muc</h1>
        <Button type="primary">
          <Link to="/admin/products">
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
          autoComplete="off"
          initialValues={{
            featured: false,
            discount: 0,
            countInStock: 0,
            ...product?.data,
          }}
          disabled={isMutating}
        >
          <Form.Item
            label="Tên damh muc"
            name="title"
            rules={[
              { required: true, message: "Tên damh muc bắt buộc phải điền" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isMutating}>
              {isMutating ? (
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

export default CategoryEditPage;
