import { Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import { FaTimes } from "react-icons/fa";

const AddAddressModal = (props) => {
  const { open, onClose } = props;

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        setProvinceList(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Fetch Quận Huyện
  useEffect(() => {
    if (selectedProvince) {
      (async () => {
        try {
          const { data } = await axios.get(
            `https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`
          );
          setDistrictList(data.data);
          setWardList([]);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      (async () => {
        try {
          const { data } = await axios.get(
            `https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`
          );
          setWardList(data.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [selectedDistrict]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      closeIcon={<FaTimes className="text-[16px]" />}
      footer={<></>}
    >
      <div className="flex items-center justify-between">
        <p className="uppercase text-[16px] font-semibold text-[#333]">
          Địa chỉ mới
        </p>
      </div>

      <hr className="h-[1px] bg-[#CFCFCF] mt-3 -mx-5" />

      <Form layout="vertical" className="mt-4">
        <p className="font-semibold text-[16px] text-[#333] mb-3">
          Thông tin khách hàng
        </p>

        <Form.Item>
          <Input placeholder="Nhập Họ Tên" className="rounded" size="large" />
        </Form.Item>

        <Form.Item>
          <Input
            placeholder="Nhập Số điện thoại"
            className="rounded"
            size="large"
          />
        </Form.Item>

        <p className="font-semibold text-[16px] text-[#333] mb-3">Địa chỉ</p>

        <div className="grid grid-cols-12 gap-3">
          <Form.Item className="col-span-6 m-0">
            <Select
              placeholder="Chọn Tỉnh/Thành phố"
              onChange={(value) => {
                setSelectedProvince(value);
                setSelectedDistrict(null);
                setSelectedWard(null);
              }}
              size="large"
              options={provinceList.map((it) => ({
                label: it.name,
                value: it.id,
              }))}
            />
          </Form.Item>

          <Form.Item className="col-span-6 m-0">
            <Select
              placeholder="Chọn Quận/Huyện"
              onChange={(value) => {
                setSelectedDistrict(value);
                setSelectedWard(null);
              }}
              value={selectedDistrict}
              disabled={!selectedProvince}
              size="large"
              options={districtList.map((it) => ({
                label: it.name,
                value: it.id,
              }))}
            />
          </Form.Item>

          <Form.Item className="col-span-6">
            <Select
              placeholder="Chọn Xã/Phường"
              size="large"
              onChange={(value) => setSelectedWard(value)}
              value={selectedWard}
              disabled={!selectedDistrict}
              options={wardList.map((it) => ({
                label: it.name,
                value: it.id,
              }))}
            />
          </Form.Item>

          <Form.Item className="col-span-6">
            <Input placeholder="Số nhà, địa chỉ" size="large" />
          </Form.Item>
        </div>

        <p className="text-[16px] text-[#333] mb-3">Loại địa chỉ</p>

        <div className="flex gap-x-3">
          <p className="h-[40px] px-3 rounded text-[#535353] border border-[#cfcfcf] text-[16px] flex items-center cursor-pointer">
            Văn phòng
          </p>

          <p className="h-[40px] px-3 rounded bg-[#FFEDED] text-[#E30019] border border-[#E30019] text-[16px] flex items-center cursor-pointer">
            Nhà riêng
          </p>
        </div>

        <Button className="uppercase bg-[#e30019] mt-5 text-white h-[40px] w-full border border-[#e30019]">
          Hoàn thành
        </Button>
      </Form>
    </Modal>
  );
};

AddAddressModal.propTypes = {
  open: Boolean,
  onClose: Function,
};

export default AddAddressModal;
