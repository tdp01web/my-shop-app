import React, { useState, useEffect } from "react";
import { Form, Input, Select, Radio, Button } from "antd";
import axios from "axios";

const { Option } = Select;

const AddressStep = ({ handleNext, cartTotal }) => {
  console.log("🚀 ~ AddressStep ~ cartTotal:", cartTotal);
  const [tinhList, setTinhList] = useState([]);
  const [quanList, setQuanList] = useState([]);
  const [phuongList, setPhuongList] = useState([]);

  const [selectedTinh, setSelectedTinh] = useState(null);
  const [selectedQuan, setSelectedQuan] = useState(null);
  const [selectedPhuong, setSelectedPhuong] = useState(null);

  const [deliveryOption, setDeliveryOption] = useState(4);
  const [deliveryFee, setDeliveryFee] = useState(25000);
  const [totalPrice, setTotalPrice] = useState(cartTotal + deliveryFee);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        setTinhList(data.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedTinh) {
      (async () => {
        try {
          const { data } = await axios.get(
            `https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`
          );
          setQuanList(data.data);
          setPhuongList([]);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách quận:", error);
        }
      })();
    }
  }, [selectedTinh]);

  useEffect(() => {
    if (selectedQuan) {
      (async () => {
        try {
          const { data } = await axios.get(
            `https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`
          );
          setPhuongList(data.data);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phường:", error);
        }
      })();
    }
  }, [selectedQuan]);

  useEffect(() => {
    setTotalPrice(cartTotal + deliveryFee);
  }, [deliveryFee, cartTotal]);

  const handleDeliveryChange = (e) => {
    const option = e.target.value;
    setDeliveryOption(option);
    setDeliveryFee(option === 3 ? 40000 : 25000);
  };

  const handleSubmit = (values) => {
    const { fullName, phoneNumber, addressDetail } = values;
    const addressData = {
      fullName,
      phoneNumber,
      tinh: tinhList.find((tinh) => tinh.id === selectedTinh)?.full_name || "",
      quan: quanList.find((quan) => quan.id === selectedQuan)?.full_name || "",
      phuong:
        phuongList.find((phuong) => phuong.id === selectedPhuong)?.full_name ||
        "",
      addressDetail,
      deliveryOption,
      deliveryFee,
      totalPrice,
    };
    handleNext(addressData);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <h2 className="text-[24px] font-semibold text-[#333]">
        Thông tin khách mua hàng
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Form.Item
          name="fullName"
          rules={[
            { required: true, message: "Vui lòng nhập họ tên" },
            { min: 6, message: "Họ tên phải có ít nhất 6 ký tự" },
          ]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^0\d{9}$/,
              message:
                "Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10 chữ số)",
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
      </div>

      <h2 className="text-[24px] font-semibold text-[#333]">
        Địa chỉ giao hàng
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Form.Item
          name="tinh"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh thành" }]}
        >
          <Select
            placeholder="Chọn Tỉnh Thành"
            value={selectedTinh}
            onChange={(value) => {
              setSelectedTinh(value);
              setSelectedQuan(null);
              setSelectedPhuong(null);
            }}
          >
            {tinhList.map((tinh) => (
              <Option key={tinh.id} value={tinh.id}>
                {tinh.full_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="quan"
          rules={[{ required: true, message: "Vui lòng chọn quận huyện" }]}
        >
          <Select
            placeholder="Chọn Quận Huyện"
            value={selectedQuan}
            onChange={(value) => setSelectedQuan(value)}
            disabled={!selectedTinh}
          >
            {quanList.map((quan) => (
              <Option key={quan.id} value={quan.id}>
                {quan.full_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="phuong"
          rules={[{ required: true, message: "Vui lòng chọn phường xã" }]}
        >
          <Select
            placeholder="Chọn Phường Xã"
            value={selectedPhuong}
            onChange={(value) => setSelectedPhuong(value)}
            disabled={!selectedQuan}
          >
            {phuongList.map((phuong) => (
              <Option key={phuong.id} value={phuong.id}>
                {phuong.full_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="addressDetail"
          rules={[
            { required: true, message: "Vui lòng nhập số nhà, tên đường" },
          ]}
        >
          <Input placeholder="Số nhà, tên đường" />
        </Form.Item>
      </div>

      <h2 className="text-[24px] font-semibold text-[#333]">
        Dịch vụ giao hàng
      </h2>
      <Radio.Group
        onChange={handleDeliveryChange}
        value={deliveryOption}
        className="flex flex-col gap-2"
      >
        <Radio value={3}>Giao hàng nhanh (2 - 4h) - 40.000₫</Radio>
        <Radio value={4}>Giao hàng tiêu chuẩn - 25.000₫</Radio>
      </Radio.Group>

      <div className="flex justify-between">
        <p>Phí vận chuyển:</p>
        <span>{deliveryFee.toLocaleString()}₫</span>
      </div>

      <div className="flex justify-between">
        <p>Tổng tiền:</p>
        <span className="text-red-500 font-semibold">
          {totalPrice.toLocaleString()}₫
        </span>
      </div>

      <Button
        type="primary"
        size="large"
        className="w-full mt-2"
        htmlType="submit"
      >
        ĐẶT HÀNG NGAY
      </Button>
    </Form>
  );
};

export default AddressStep;
