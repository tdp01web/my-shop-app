import {
  BackwardFilled,
  CloseOutlined,
  Loading3QuartersOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../../../configs/instance";
import { usePostProduct } from "../../../../hooks/mutations/usePostProduct";
import { useGetAllBrand } from "../../../../hooks/queries/useGetAllBrand";
import { useState } from "react";
import { useGetAllCategory } from "../../../../hooks/queries/useGetAllCategory";
import { useGetAllCPU } from "../../../../hooks/queries/useGetAllCPU";
import { useGetAllGPU } from "../../../../hooks/queries/useGetAllGPU";
import { useGetAllRAM } from "../../../../hooks/queries/useGetAllRAM";
import { useGetAllSSD } from "../../../../hooks/queries/useGetAllSSD";

const AddProduct = () => {
  const navigate = useNavigate();
  const [optionBrand, setOptionBrand] = useState([]);
  const [optionCategory, setOptionCategory] = useState([]);
  const [optionCPU, setOptionCPU] = useState([]);
  const [optionGPU, setOptionGPU] = useState([]);
  const [optionRAM, setOptionRAM] = useState([]);
  const [optionSSD, setOptionSSD] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

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
    console.log("🚀 ~ normFile ~ e:", e?.fileList);

    return e?.fileList.filter(file =>
      !file.type ||
      (file.type !== "" &&
        file.type.startsWith('image/') &&
        (file.type.endsWith('jpeg') || file.type.endsWith('png')) || file.type.endsWith('jpg')))
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
    }
    return isJpgOrPng;
  };
  const {
    data: dataBrand,
    isLoading: isLoadingBrand,
    isError: isErrorBrand,
  } = useGetAllBrand({
    onSuccess: (data) => {
      const brands = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.title,
      }));
      setOptionBrand(brands);
    },
    onError: (error) => {
      throw new Error(error);
    },
  });
  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
  } = useGetAllCategory({
    onSuccess: (data) => {
      const categories = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.name,
      }));
      setOptionCategory(categories);
    },
    onError: (error) => {
      throw new Error(error);
    },
  });
  const {
    data: dataCPU,
    isLoading: isLoadingCPU,
    isError: isErrorCPU,
  } = useGetAllCPU({
    onSuccess: (data) => {
      const cpu = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.name,
      }));
      setOptionCPU(cpu);
    },
    onError: (error) => {
      throw new Error(error);
    },
  });
  const {
    data: dataGPU,
    isLoading: isLoadingGPU,
    isError: isErrorGPU,
  } = useGetAllGPU({
    onSuccess: (data) => {
      const gpu = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.name,
      }));
      setOptionGPU(gpu);
    },
    onError: (error) => {
      throw new Error(error);
    },
  });
  const {
    data: dataRAM,
    isLoading: isLoadingRAM,
    isError: isErrorRAM,
  } = useGetAllRAM({
    onSuccess: (data) => {
      const ram = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.size,
      }));
      setOptionRAM(ram);
    },
    onError: (error) => {
      throw new Error(error);
    },
  });
  const {
    data: dataSSD,
    isLoading: isLoadingSSD,
    isError: isErrorSSD,
  } = useGetAllSSD({
    onSuccess: (data) => {
      const ssd = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.capacity,
      }));
      setOptionSSD(ssd);
    },
    onError: (error) => {
      throw new Error(error);
    },
  });

  const { mutate, isLoading: isPending } = usePostProduct({
    onSuccess: () => {
      messageApi.success("Thêm sản phẩm thành công");
      setTimeout(() => {
        navigate("/admin/products");
      }, 500)
      form.resetFields();
    },
    onError: () => {
      messageApi.error("Thêm sản phẩm thất bại");
    },
  });

  const onFinish = (values) => {
    const productData = {
      ...values,
      images: uploadedImages,
    };
    console.log(productData);
    mutate(productData);
  };

  if (
    isLoadingBrand ||
    isLoadingCategory ||
    isLoadingCPU ||
    isLoadingGPU ||
    isLoadingRAM ||
    isLoadingSSD
  )
    return <p>Loading...</p>;
  if (
    isErrorBrand ||
    isErrorCategory ||
    isErrorCPU ||
    isErrorGPU ||
    isErrorRAM ||
    isErrorSSD
  )
    return <p>Error loading brands</p>;
  return (
    <div className="">
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Thêm sản phẩm</h1>
        <Button type="primary">
          <Link to="/admin/products">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <div className="mx-auto max-w-3xl">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 1280 }}
          onFinish={onFinish}
          autoComplete="off"
          disabled={isPending}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="title"
            rules={[
              { required: true, message: "Tên sản phẩm bắt buộc phải điền" },
            ]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            accept=".jpg, .jpeg, .png"
            beforeUpload={beforeUpload}
            label="Images"
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
          <Form.Item
            label="Kích thước màn hình"
            name="lcd"
            rules={[
              { required: true, message: "Kích thước màn hình bắt buộc phải điền" },
            ]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Danh mục bắt buộc phải điền" }]}
          >
            <Select
              showSearch
              placeholder="Chọn danh mục"
              optionFilterProp="label"
              options={optionCategory}
            />
          </Form.Item>
          <Form.Item
            label="Hãng"
            name="brand"
            rules={[{ required: true, message: "Hãng bắt buộc phải điền" }]}
          >
            <Select
              showSearch
              placeholder="Chọn hãng"
              optionFilterProp="label"
              options={optionBrand}
            />
          </Form.Item>
          <Form.Item label="Biến thể">
            <Form.List
              name="variants"
              initialValue={[
                {
                  price: null,
                  quantity: null,
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Card
                      style={{ marginTop: "10px" }}
                      size="small"
                      title={`Biến thể ${name + 1}`}
                      extra={
                        fields.length > 1 ? (
                          <CloseOutlined
                            onClick={() => remove(name)}
                          />
                        ) : null
                      }
                    >
                      <Form.Item key={key} required={false} >
                        <Form.Item
                          {...restField}
                          name={[name]}
                          fieldKey={[fieldKey]}
                        >
                          <Form.Item
                            {...restField}
                            label={"CPU"}
                            name={[name, "processor"]}
                            fieldKey={[fieldKey, "processor"]}
                            rules={[
                              { required: true, message: "CPU bắt buộc phải điền" },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn CPU"
                              optionFilterProp="label"
                              options={optionCPU}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label={"GPU"}
                            name={[name, "gpu"]}
                            fieldKey={[fieldKey, "gpu"]}
                            rules={[
                              { required: true, message: "GPU bắt buộc phải điền" },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn GPU"
                              optionFilterProp="label"
                              options={optionGPU}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label={"RAM"}
                            name={[name, "ram"]}
                            fieldKey={[fieldKey, "ram"]}
                            rules={[
                              { required: true, message: "RAM bắt buộc phải điền" },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn RAM"
                              optionFilterProp="label"
                              options={optionRAM}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label={"SSD"}
                            name={[name, "storage"]}
                            fieldKey={[fieldKey, "storage"]}
                            rules={[
                              { required: true, message: "SSD bắt buộc phải điền" },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn SSD"
                              optionFilterProp="label"
                              options={optionSSD}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label={"Giá"}
                            name={[name, "price"]}
                            fieldKey={[fieldKey, "price"]}
                            rules={[
                              {
                                required: true,
                                message: "Giá biến thể bắt buộc phải điền",
                              },
                              {
                                type: "number",
                                min: 0,
                                message: "Giá biến thể không được âm",
                              },
                            ]}
                          >
                            <InputNumber placeholder="Nhập giá biến thể" style={{ width: "100%" }} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label={"Số lượng "}
                            name={[name, "quantity"]}
                            fieldKey={[fieldKey, "quantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Số lượng bắt buộc phải điền",
                              },
                              {
                                type: "number",
                                min: 0,
                                message: "Số lượng không được âm",
                              },
                            ]}
                          >
                            <InputNumber placeholder="Nhập số lượng biến thể" style={{ width: "100%" }} />
                          </Form.Item>
                          <Form.Item label="Thuộc tính thêm">
                            <Form.List name={[name, 'attributes']}>
                              {(subFields, subOpt) => (
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: 16,
                                  }}
                                >
                                  {subFields.map((subField) => (
                                    <Space key={subField.key}>
                                      <Form.Item label="Tên" name={[subField.name, 'keyA']}
                                        rules={[
                                          { required: true, message: "Tên thuộc tính bắt buộc phải điền" },
                                        ]}
                                      >
                                        <Input placeholder="Tên " />
                                      </Form.Item>
                                      <Form.Item label="Thuộc tính" name={[subField.name, 'valueA']}
                                        rules={[
                                          { required: true, message: "Thuộc tính bắt buộc phải điền" },
                                        ]}
                                      >
                                        <Input placeholder="Thuộc tính" />
                                      </Form.Item>
                                      <CloseOutlined
                                        onClick={() => {
                                          subOpt.remove(subField.name);
                                        }}
                                      />
                                    </Space>
                                  ))}
                                  <Button type="dashed" onClick={() => subOpt.add()} block>
                                    + Thêm thuộc tính
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </Form.Item>
                        </Form.Item>
                      </Form.Item>
                    </Card>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "30%", alignItems: "center", display: "flex", marginTop: "10px" }}
                    icon={<PlusOutlined />}
                  >
                    Thêm biến thể
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
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
    </div >
  );
};

export default AddProduct;
