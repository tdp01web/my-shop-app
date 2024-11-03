import { BackwardFilled, Loading3QuartersOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Select, Upload } from "antd";
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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const { data: product, isLoading, isError } = useGetProductByID(
    id, {
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })
  const { data: dataBrand, isLoading: isLoadingBrand, isError: isErrorBrand } = useGetAllBrand({
    onSuccess: (data) => {
      const brands = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.title,
      }));
      setOptionBrand(brands);
    },
    onError: (error) => {
      throw new Error(error)
    }
  })
  const { data: dataCategory, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetAllCategory({
    onSuccess: (data) => {
      const categories = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.name,
      }));
      setOptionCategory(categories);
    },
    onError: (error) => {
      throw new Error(error)
    }
  })
  const { data: dataCPU, isLoading: isLoadingCPU, isError: isErrorCPU } = useGetAllCPU({
    onSuccess: (data) => {
      const cpu = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.name,
      }));
      setOptionCPU(cpu);
    },
    onError: (error) => {
      throw new Error(error)
    }
  })
  const { data: dataGPU, isLoading: isLoadingGPU, isError: isErrorGPU } = useGetAllGPU({
    onSuccess: (data) => {
      const gpu = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.name,
      }));
      setOptionGPU(gpu);
    },
    onError: (error) => {
      throw new Error(error)
    }
  })
  const { data: dataRAM, isLoading: isLoadingRAM, isError: isErrorRAM } = useGetAllRAM({
    onSuccess: (data) => {
      const ram = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.size,
      }));
      setOptionRAM(ram);
    },
    onError: (error) => {
      throw new Error(error)
    }
  })
  const { data: dataSSD, isLoading: isLoadingSSD, isError: isErrorSSD } = useGetAllSSD({
    onSuccess: (data) => {
      const ssd = data?.data?.map((item) => ({
        value: item?._id,
        label: item?.capacity,
      }));
      setOptionSSD(ssd);
    },
    onError: (error) => {
      throw new Error(error)
    }
  })
  const { mutate, isPending, isError: isErrorPutProduct } = usePutProduct(
    id,
    {
      onSuccess: () => {
        messageApi.success("Cập nhật sản phẩm thành công");
        navigate('/admin/products')
        queryClient.invalidateQueries({
          queryKey: ["get-all-products"],
        })
      },
      onError: () => {
        messageApi.error("Cập nhật sản phẩm thất bại");
      },
    })
  const onFinish = (values) => {
    mutate(values);
  };
  console.log(product?.data)
  if (isLoading || isLoadingBrand || isLoadingCategory || isLoadingCPU || isLoadingGPU || isLoadingRAM || isLoadingSSD) return <div>Loading...</div>;
  if (isError || isErrorBrand || isErrorCategory || isErrorCPU || isErrorGPU || isErrorRAM || isErrorSSD) return <div>Đã có lỗi xảy ra</div>;
  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold text-2xl">Chỉnh sửa sản phẩm</h1>
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
          initialValues={{
            title: product?.data?.title,
            images: product?.data?.images || [],
            description: product?.data?.description,
            category: product?.data?.category?._id,
            brand: product?.data?.brand?._id,
            variants: product?.data?.variants || [{ cpu: '', gpu: '', ram: '', storage: '', price: null, quantity: null }],
          }}
          autoComplete="off"
          disabled={isPending}
        >
          <Form.Item
            label="Tên sản phẩm"
            placeholder="Tên sản phẩm"
            name="title"
            rules={[{ required: true, message: "Tên sản phẩm bắt buộc phải điền" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Images" name="images" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item label="Mô tả" name="description" placeholder="Mô tả">
            <TextArea rows={4} />
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
          <Form.List name="variants" initialValue={product?.data?.variants || [{ cpu: '', gpu: '', ram: '', storage: '', price: null, quantity: null }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Form.Item key={key} required={false} label="Biến thể"  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      fieldKey={[fieldKey]}
                    // rules={[{ required: true, whitespace: true, message: "Vui lòng nhập tên biến thể hoặc xóa trường này." }]}
                    >
                      <Form.Item
                        {...restField}
                        label={"Màu"}
                        name={[name, 'color']}
                        fieldKey={[fieldKey, 'color']}
                        rules={[{ required: true, message: "Màu bắt buộc phải điền" }]}
                      >
                        <Select
                          showSearch
                          placeholder="Chọn Màu"
                          optionFilterProp="label"
                          options={optionCPU}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label={"CPU"}
                        name={[name, 'processor']}
                        fieldKey={[fieldKey, 'processor']}
                        rules={[{ required: true, message: "CPU bắt buộc phải điền" }]}
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
                        name={[name, 'gpu']}
                        fieldKey={[fieldKey, 'gpu']}
                        rules={[{ required: true, message: "GPU bắt buộc phải điền" }]}
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
                        name={[name, 'ram']}
                        fieldKey={[fieldKey, 'ram']}
                        rules={[{ required: true, message: "RAM bắt buộc phải điền" }]}
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
                        name={[name, 'storage']}
                        fieldKey={[fieldKey, 'storage']}
                        rules={[{ required: true, message: "SSD bắt buộc phải điền" }]}
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
                        label={"Gía"}
                        name={[name, 'price']}
                        fieldKey={[fieldKey, 'price']}
                        rules={[
                          { required: true, message: "Giá sản phẩm bắt buộc phải điền" },
                          { type: "number", min: 0, message: "Giá sản phẩm không được âm" }
                        ]}
                      >
                        <InputNumber style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label={"Số lượng "}
                        name={[name, 'quantity']}
                        fieldKey={[fieldKey, 'quantity']}
                        rules={[
                          { required: true, message: "Số lượng bắt buộc phải điền" },
                          { type: "number", min: 0, message: "Số lượng không được âm" }
                        ]}
                      >
                        <InputNumber style={{ width: '100%' }} />
                      </Form.Item>
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(name)} />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                  <Button type="dashed" onClick={() => add()} style={{ width: '30%' }} icon={<PlusOutlined />}>
                    Thêm biến thể
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isPending}>
              {isPending ? (
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
    </div >
  );
};

export default EditProduct;
