import { Button, Form, Input, Radio, Select, Switch } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import ModalUser from './modalUser';
import { useGetAllVouchers } from '../../../hooks/queries/useGetAllVouchers';
import { useTabsContext } from './contextTab';
import { usePostOrderSales } from '../../../hooks/mutations/usePostOrderSales';
import { App, message } from "antd";

const FormUser = ({ item }) => {
  const [form1] = Form.useForm();
  const watchShip = Form.useWatch('ship', form1)
  const watchDelivery = Form.useWatch('delivery', form1)
  const modalUserRef = useRef();
  const [optionVoucher, setOptionVoucher] = useState([]);
  const { message } = App.useApp()
  const { items, handleRemoveItem } = useTabsContext();

  const { data: dataVoucher, isLoading, isError } = useGetAllVouchers({
    onSuccess: (data) => {
      const currentDate = new Date();
      const voucher = data?.data
        ?.filter(item =>
          item.status === 1 &&
          new Date(item.expiry) > currentDate &&
          item.maxUses > 0 &&
          item.maxUses > item.usageCount
        )
        .map(item => ({
          value: `${item?.maxDiscountAmount}-${item?._id}`,
          label: item?.name,
        }));

      setOptionVoucher(voucher);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const onChangeVoucher = (value) => {
    const selectedVoucher = optionVoucher.find(option => option.value === value);
    form1.setFieldsValue({ discount: selectedVoucher ? (Number(selectedVoucher.value.split('-')[0]).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })) : 0 });
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    const totalProductPrice = form1.getFieldValue('totalProductPrice') || '0';
    const discount = form1.getFieldValue('discount') || '0';
    const shipping = watchDelivery ? (watchShip === 1 ? 40000 : 25000) : 0;

    const totalProductPriceNum = Number(totalProductPrice.replace(/[₫,. ]/g, ''));
    const discountNum = Number(discount.replace(/[₫,. ]/g, ''));

    const finalPrice = totalProductPriceNum + Number(shipping) - discountNum;

    form1.setFieldsValue({
      totalPrice: isNaN(finalPrice) ? 0 : finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    });
  };

  useEffect(() => {
    form1.setFieldsValue({
      name: item?.user?.name,
      email: item?.user?.email,
      mobile: item?.user?.mobile,
      address: item?.user?.address,
      ship: 1,
      delivery: false,
      paymentMethod: 1,
      discount: Number(0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      totalProductPrice: Number(item?.product?.reduce((acc, curr) => Number(acc) + Number(curr?.totalPrice), 0)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    });
    calculateTotalPrice();
  }, [item]);


  useEffect(() => {
    calculateTotalPrice();

  }, [form1, watchShip, watchDelivery]);

  const { mutate } = usePostOrderSales({
    onSuccess: () => {
      message.open({
        type: "success",
        content: "Đặt hàng thành công",
      });
      handleRemoveItem(item.key)
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  })

  const onFinish = (values) => {
    if (item.product.length === 0) {
      return message.error('Vui lòng chọn sản phẩm')
    }
    const transFormData = {
      products: item.product.map((pr) => {
        return {
          prodId: pr.keyPr,
          title: (pr.title).split('|')[0].trim(),
          images: pr.image,
          processor: pr.cpu,
          gpu: pr.gpu,
          ram: pr.ram,
          storage: pr.ssd,
          price: pr.price,
          count: pr.quantityPr,
          variant: pr.id
        }
      }),
      shippingAddress: {
        name: values.name,
        phone: values.mobile,
        addressLine1: values.address,
      },
      shippingFee: values.ship === 1 ? 40000 : 25000,
      totalProductPrice: Number(values.totalProductPrice.replace(/[₫,. ]/g, '')),
      totalPrice: Number(values.totalPrice.replace(/[₫,. ]/g, '')),
      paymentMethod: values.paymentMethod === 1 ? "Tiền Mặt" : "Chuyển Khoản",
      paymentStatus: "Đã Thanh Toán",
      orderStatus: "Hoàn Thành",
      salesTypes: 0
    }
    mutate(transFormData);
  };
  return (
    <>
      <Form
        form={form1}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "100%" }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className='grid grid-cols-2 mt-4'>
          <div className='col-span-1'>
            <div className='flex flex-row items-center gap-8'>
              <h3 className='font-bold text-xl'>Khách hàng</h3>
              <Button type="primary" onClick={() => {
                modalUserRef.current.open(item.key)
              }}>
                Chọn tài khoản
              </Button>
            </div>
            <div className='mt-4'>
              <Form.Item
                label={<span className="block min-w-[80px] text-left">Tên:</span>}
                name="name"
                rules={[{ required: true, message: "Tên khách hàng bắt buộc phải điền" }]}
                colon={false}
              >
                <Input placeholder='Nhập tên khách hàng' />
              </Form.Item>
              <Form.Item
                label={<span className="block min-w-[80px] text-left">Email:</span>}
                name="email"
                colon={false}
              >
                <Input placeholder='Nhập email khách hàng' />
              </Form.Item>
              <Form.Item
                label={<span className="block min-w-[80px] text-left">Số điện thoại:</span>}
                name="mobile"
                rules={[{ required: true, message: "Số điện thoại bắt buộc phải điền" }]}
                colon={false}
              >
                <Input placeholder='Nhập số điện thoại khách hàng' />
              </Form.Item>
              <Form.Item
                label={<span className="block min-w-[80px] text-left">Địa chỉ:</span>}
                name="address"
                rules={watchDelivery ? [{ required: true, message: "Địa chỉ bắt buộc phải điền" }] : []}
                colon={false}
              >
                <Input placeholder='Nhập địa chỉ khách hàng' />
              </Form.Item>
            </div>
          </div>
          <div className='col-span-1'>
            <h3 className='font-bold text-xl'>Thông tin thanh toán</h3>
            <div className='mt-4'>
              <Form.Item
                label={<span className="block min-w-[100px] text-left">Thanh toán:</span>}
                name="paymentMethod"
                colon={false}
              >
                <Radio.Group>
                  <Radio value={1}>Tiền Mặt</Radio>
                  <Radio value={2}>Chuyển Khoản</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<span className="block min-w-[100px] text-left">Mã giảm giá:</span>}
                name="voucher"
                colon={false}
              >
                <Select
                  showSearch
                  placeholder="Mã giảm giá"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={optionVoucher}
                  onChange={onChangeVoucher}
                />
              </Form.Item>
              <Form.Item
                label={<span className="block min-w-[100px] text-left">Tiền hàng:</span>}
                name="totalProductPrice"
                colon={false}
              >
                <Input placeholder='Nhập tiền hàng' onChange={calculateTotalPrice} style={{ pointerEvents: 'none', border: 'none' }} />
              </Form.Item>
              <Form.Item
                label={<span className="block min-w-[100px] text-left">Giao hàng:</span>}
                name="delivery"
                colon={false}
              >
                <Switch />
              </Form.Item>
              {watchDelivery && (
                <Form.Item
                  label={<span className="block min-w-[100px] text-left">Vận chuyển:</span>}
                  name="ship"
                  colon={false}
                >
                  <Radio.Group>
                    <Radio value={1}>Giao hàng nhanh</Radio>
                    <Radio value={2}>Giao hàng tiêu chuẩn</Radio>
                  </Radio.Group>
                </Form.Item>
              )}
              <Form.Item
                label={<span className="block min-w-[100px] text-left">Giảm giá:</span>}
                name="discount"
                colon={false}
              >
                <Input placeholder='Nhập giảm giá' onChange={calculateTotalPrice} style={{ pointerEvents: 'none', border: 'none' }} />
              </Form.Item>
              <Form.Item
                label={<span className="block min-w-[100px] text-left">Tổng tiền:</span>}
                name="totalPrice"
                colon={false}
              >
                <Input placeholder='Tổng tiền' style={{ pointerEvents: 'none', border: 'none' }} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Xác nhận đặt hàng
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
      <ModalUser ref={modalUserRef} />
    </>
  )
}

export default FormUser;