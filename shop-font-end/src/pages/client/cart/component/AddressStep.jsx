import React, { useState, useEffect } from "react";
import { Input, Select, Radio, Button } from "antd";
import axios from "axios";

const { Option } = Select;

const AddressStep = ({ handleNext }) => {
  const [tinhList, setTinhList] = useState([]);
  const [quanList, setQuanList] = useState([]);
  const [phuongList, setPhuongList] = useState([]);
  const [selectedTinh, setSelectedTinh] = useState(null);
  const [selectedQuan, setSelectedQuan] = useState(null);

  const [gender, setGender] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState(4);
  const [deliveryFee, setDeliveryFee] = useState(25000);
  const [totalPrice, setTotalPrice] = useState(100000);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        setTinhList(data.data);
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
      }
    })();
  }, []);

  // Fetch Quận Huyện
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
          console.log("🚀 ~ useEffect ~ error:", error);
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
          console.log("🚀 ~ useEffect ~ error:", error);
        }
      })();
    }
  }, [selectedQuan]);

  const handleDeliveryChange = (e) => {
    const selectedOption = e.target.value;
    setDeliveryOption(selectedOption);

    if (selectedOption === 3) {
      setDeliveryFee(40000);
    } else {
      setDeliveryFee(25000);
    }
  };

  useEffect(() => {
    setTotalPrice(100000 + deliveryFee);
  }, [deliveryFee]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <h2 className="text-[24px] font-semibold text-[#333]">
          Thông tin khách mua hàng
        </h2>
        <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
          <Radio value={1}>Nam</Radio>
          <Radio value={2}>Nữ</Radio>
        </Radio.Group>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Nhập họ tên" />
          <Input placeholder="Nhập số điện thoại" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-[24px] font-semibold text-[#333]">
          Địa chỉ giao hàng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            placeholder="Chọn Tỉnh Thành"
            onChange={(value) => {
              setSelectedTinh(value);
              setSelectedQuan(null);
            }}
            value={selectedTinh}
          >
            <Option value={null}>Tỉnh Thành</Option>
            {tinhList.map((tinh) => (
              <Option key={tinh.id} value={tinh.id}>
                {tinh.full_name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Chọn Quận Huyện"
            onChange={(value) => setSelectedQuan(value)}
            value={selectedQuan}
            disabled={!selectedTinh}
          >
            <Option value={null}>Quận Huyện</Option>
            {quanList.map((quan) => (
              <Option key={quan.id} value={quan.id}>
                {quan.full_name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Chọn Phường Xã"
            value={null}
            disabled={!selectedQuan}
          >
            <Option value={null}>Phường Xã</Option>
            {phuongList.map((phuong) => (
              <Option key={phuong.id} value={phuong.id}>
                {phuong.full_name}
              </Option>
            ))}
          </Select>
          <Input placeholder="Số nhà tên đường" />
        </div>
      </div>
      <div>
        <h2 className="text-[24px] font-semibold text-[#333]">
          Dịch vụ giao hàng
        </h2>
        <Radio.Group
          onChange={handleDeliveryChange}
          className="flex flex-col w-full"
          value={deliveryOption}
        >
          <Radio value={3} className="w-full flex items-center">
            <div className="flex justify-between">
              <p>Giao hàng nhanh (2 - 4h)</p>
              <span>40.000₫</span>
            </div>
          </Radio>
          <Radio value={4} className="w-full flex items-center">
            <div className="flex justify-between">
              <p>Giao hàng tiêu chuẩn</p>
              <span>25.000₫</span>
            </div>
          </Radio>
        </Radio.Group>
      </div>
      <div className="flex flex-col gap-3">
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
          className=" bg-red-600"
          onClick={handleNext}
        >
          ĐẶT HÀNG NGAY
        </Button>
      </div>
      <p className="text-center  text-gray-500">
        Bạn có thể chọn hình thức thanh toán sau khi đặt hàng
      </p>
    </div>
  );
};

export default AddressStep;
