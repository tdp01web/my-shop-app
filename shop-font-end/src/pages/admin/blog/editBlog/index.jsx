import { BackwardFilled, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select, Upload } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetBrandByID } from "../../../../hooks/queries/useGetBrandByID";
import { usePutBrand } from "../../../../hooks/mutations/usePutBrand";
import { useGetBlogByID } from "../../../../hooks/queries/useGetBlogDetail";
import { usePutBlog } from "../../../../hooks/mutations/usePutBlog";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const EditBlog = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [uploadedImages, setUploadedImages] = useState([]);
  const handleUploadChange = ({ fileList }) => {
    const structuredData = fileList
      .flatMap(
        (file) =>
          file.response?.map((res) => ({
            url: res?.url,
            asset_id: res?.asset_id,
            public_id: res?.public_id,
          })) || []
      )
      .filter((file) => file.url);

    setUploadedImages(structuredData);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const { data, isLoading, isError } = useGetBlogByID(id,
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    })
  const { mutate, isPending } = usePutBlog(id, {
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Sửa tin tức thành công",
      });
      setTimeout(() => {
        navigate('/admin/blog');
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["get-all-blog"],
      });
    },
    onError(error) {
      if (error.response?.data) {
        const { message } = error.response.data;
        if (message.includes("duplicate key error")) {
          messageApi.open({
            type: "error",
            content: "Tiêu đề đã tồn tại. Vui lòng chọn tên khác.",
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
        <h1 className="font-semibold text-2xl">Chi tiết tin tức</h1>
        <Button type="primary">
          <Link to="/admin/blog">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <div className="mx-auto max-w-3xl">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 1280 }}
          onFinish={onFinish}
          initialValues={data?.data}
          autoComplete="off"
          disabled={isPending}
        >
          <Form.Item
            label="Tiêu đề tin tức"
            name="title"
            rules={[{
              required: true, message: "Tên tiêu dề bắt buộc phải điền",
              max: 32, message: "Vui lòng nhập tên hãng nhỏ hơn 32 kí tự"
            }]}
          >
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>
          <Form.Item
            label="Ảnh tin tức"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              action="http://localhost:3000/api/upload"
              name="images"
              listType="picture-card"
              onChange={handleUploadChange}
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item label="Mô tả" name="description" placeholder="Mô tả"
            rules={[
              { required: true, message: "Mô tả sản phẩm bắt buộc phải điền" },
            ]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả" />
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

export default EditBlog;
