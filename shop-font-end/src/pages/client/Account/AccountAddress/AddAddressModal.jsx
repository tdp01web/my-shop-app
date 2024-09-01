import { Button, Form, Input, Modal, Select } from "antd";

import { FaTimes } from "react-icons/fa";

const AddAddressModal = (props) => {
  const { open, onClose } = props;

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
              size="large"
              options={[
                {
                  label: "Hà Nội",
                  value: 1,
                },
              ]}
            />
          </Form.Item>

          <Form.Item className="col-span-6 m-0">
            <Select
              placeholder="Chọn Quận/Huyện"
              size="large"
              options={[
                {
                  label: "Hà Nội",
                  value: 1,
                },
              ]}
            />
          </Form.Item>

          <Form.Item className="col-span-6">
            <Select
              placeholder="Chọn Xã/Phường"
              size="large"
              options={[
                {
                  label: "Hà Nội",
                  value: 1,
                },
              ]}
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
