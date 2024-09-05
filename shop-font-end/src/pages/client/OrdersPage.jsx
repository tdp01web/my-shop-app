import React, { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";

const { Option } = Select;

const OrdersPage = () => {
  const [tinhList, setTinhList] = useState([]);
  const [quanList, setQuanList] = useState([]);
  const [phuongList, setPhuongList] = useState([]);
  const [selectedTinh, setSelectedTinh] = useState(null);
  const [selectedQuan, setSelectedQuan] = useState(null);

  // Fetch Tỉnh Thành
  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        if (response.data.error === 0) {
          setTinhList(response.data.data);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the Tỉnh Thành data!",
          error
        );
      });
  }, []);

  // Fetch Quận Huyện
  useEffect(() => {
    if (selectedTinh) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setQuanList(response.data.data);
            setPhuongList([]); // Clear phường xã list
          }
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the Quận Huyện data!",
            error
          );
        });
    }
  }, [selectedTinh]);

  useEffect(() => {
    if (selectedQuan) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setPhuongList(response.data.data);
          }
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the Phường Xã data!",
            error
          );
        });
    }
  }, [selectedQuan]);
  return (
    <div style={{ textAlign: "center" }}>
      <Select
        style={{ width: "25%", margin: "0 2%" }}
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
        style={{ width: "25%", margin: "0 2%" }}
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
        style={{ width: "25%", margin: "0 2%" }}
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
    </div>
  );
};

export default OrdersPage;
