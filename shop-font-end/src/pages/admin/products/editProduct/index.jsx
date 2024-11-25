import {
  BackwardFilled,
  CloseOutlined,
  Loading3QuartersOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetProductByID } from "../../../../hooks/queries/useGetProductByID";
import { useForm } from "antd/es/form/Form";
import { useGetAllSSD } from "../../../../hooks/queries/useGetAllSSD";
import { useGetAllRAM } from "../../../../hooks/queries/useGetAllRAM";
import { useGetAllGPU } from "../../../../hooks/queries/useGetAllGPU";
import { useGetAllCPU } from "../../../../hooks/queries/useGetAllCPU";
import { useGetAllCategory } from "../../../../hooks/queries/useGetAllCategory";
import { useGetAllBrand } from "../../../../hooks/queries/useGetAllBrand";
import { useState } from "react";
import { usePutProduct } from "../../../../hooks/mutations/usePutProuct";

const EditProduct = () => {
  const [optionBrand, setOptionBrand] = useState([]);
  const [optionCategory, setOptionCategory] = useState([]);
  const [optionCPU, setOptionCPU] = useState([]);
  const [optionGPU, setOptionGPU] = useState([]);
  const [optionRAM, setOptionRAM] = useState([]);
  const [optionSSD, setOptionSSD] = useState([]);

  const navigate = useNavigate();
  const { form } = useForm();
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUploadChange = ({ fileList }) => {
    const structuredData = fileList
      .map((file) => {
        const res = Array.isArray(file.response)
          ? file.response[0]
          : file.response;
        if (res && res.url && res.public_id) {
          return {
            url: res.url,
            public_id: res.public_id,
          };
        }
        return null;
      })
      .filter(Boolean);

    setUploadedImages(structuredData);
    console.log("🚀 ~ handleUploadChange ~ structuredData:", structuredData);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log("🚀 ~ normFile ~ e:", e?.fileList);
    return e?.fileList;
  };

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByID(id, {
    onSuccess: (data) => {
      // (data);
    },
    onError: (error) => {
      // (error);
    },
  });
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
  const {
    mutate,
    isPending,
    isError: isErrorPutProduct,
  } = usePutProduct(id, {
    onSuccess: () => {
      messageApi.success("Cập nhật sản phẩm thành công");
      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["get-all-products"],
      });
    },
    onError: () => {
      // (isErrorPutProduct);
      messageApi.error("Cập nhật sản phẩm thất bại");
    },
  });
  const onFinish = (values) => {
    const updatedValues = {
      ...values,
      images: uploadedImages,
    };
    console.log("🚀 ~ onFinish ~ updatedValues:", updatedValues);
    mutate(updatedValues);
  };
  if (
    isLoading ||
    isLoadingBrand ||
    isLoadingCategory ||
    isLoadingCPU ||
    isLoadingGPU ||
    isLoadingRAM ||
    isLoadingSSD
  )
    return <div>Loading...</div>;
  if (
    isError ||
    isErrorBrand ||
    isErrorCategory ||
    isErrorCPU ||
    isErrorGPU ||
    isErrorRAM ||
    isErrorSSD
  )
    return <div>Đã có lỗi xảy ra</div>;
  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Chi tiết sản phẩm</h1>
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
          initialValues={{
            title: product?.data?.title,
            images: product?.data?.images || [],
            description: product?.data?.description,
            lcd: product?.data?.lcd,
            category: product?.data?.category?._id,
            brand: product?.data?.brand?._id,
            variants: product?.data?.variants.map((item) => ({
              processor: item.processor._id,
              gpu: item.gpu._id,
              ram: item.ram._id,
              storage: item.storage._id,
              price: item.price,
              quantity: item.quantity,
              key: item._id,
              attributes: item.attributes.map((itemA) => ({
                keyA: itemA._id,
                keyA: itemA.keyA,
                valueA: itemA.valueA
              }))
            })),
          }}
        >
          <Form.Item
            label="Tên sản phẩm"
            placeholder="Tên sản phẩm"
            name="title"
            rules={[
              { required: true, message: "Tên sản phẩm bắt buộc phải điền" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
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
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Kích thước màn hình"
            name="lcd"
            rules={[
              { required: true, message: "Kích thước màn hình bắt buộc phải điền" },
            ]}
          >
            <Input placeholder="Nhập kích thước" />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: "Danh mục bắt buộc phải điền" }]}
          >
            <Select
              showSearch
              placeholder="Danh mục"
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
              placeholder="Hãng"
              optionFilterProp="label"
              options={optionBrand}
            />
          </Form.Item>
          <Form.Item label="Biến thể">
            <Form.List
              name="variants"
              initialValue={product?.data?.variants.map((item) => {
                return ({
                  processor: item.processor._id,
                  gpu: item.gpu._id,
                  ram: item.ram._id,
                  storage: item.storage._id,
                  price: item.price,
                  quantity: item.quantity,
                  key: item._id,
                  attributes: item.attributes
                })
              })}
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
                                message: "Giá sản phẩm bắt buộc phải điền",
                              },
                              {
                                type: "number",
                                min: 0,
                                message: "Giá sản phẩm không được âm",
                              },
                            ]}
                          >
                            <InputNumber style={{ width: "100%" }} />
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
                            <InputNumber style={{ width: "100%" }} />
                          </Form.Item>
                          <Form.Item label="Thuộc tính thêm">
                            <Form.List name={[name, 'attributes']}
                            >
                              {(subFields, subOpt) => (
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: 16,
                                  }}
                                >
                                  {subFields.map((subField) => {
                                    return (
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
                                    )
                                  })}
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
    </div>
  );
};

export default EditProduct;
