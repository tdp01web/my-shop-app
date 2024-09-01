import { Button } from "antd";
import AddAddressModal from "./AddAddressModal";
import { useState } from "react";

const AddressItem = (props) => {
  const { isDefault } = props;

  return (
    <div className="py-5 border-t border-[#cfcfcf] flex items-center justify-between gap-x-4">
      <div className="text-[14px] flex-1">
        <div className="flex items-center gap-x-2">
          {isDefault && (
            <p className="border border-[#e30019] rounded h-7 px-2 text-[#e30019] flex items-center">
              Mặc định
            </p>
          )}

          <p className="text-[#111] font-semibold">Xuân Đạt</p>
          <p className="text-[#535353]">|</p>
          <p className="text-[#535353]">0983983983</p>
        </div>

        <p className="text-[#535353] mt-2">
          ĐƠN TEST, Xã An Phú Tây, Huyện Bình Chánh, Hồ Chí Minh, Vietnam
        </p>
      </div>

      <div>
        <div className="flex items-center gap-x-3 justify-end text-[14px] mb-2 text-[#1982f9]">
          <p className="cursor-pointer">Cập nhật</p>
          {!isDefault && <p className="cursor-pointer">Xoá</p>}
        </div>

        {!isDefault && <Button>Thiết lập mặc định</Button>}
      </div>
    </div>
  );
};

AddressItem.propTypes = {
  isDefault: Boolean,
};

const AccountAddress = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-[24px] font-semibold text-[#333] leading-tight">
          Thông tin tài khoản
        </h2>

        <Button
          type="primary"
          className="h-9"
          onClick={() => setOpenModal(true)}
        >
          + Thêm địa chỉ mới
        </Button>
      </div>

      <div className="px-6 py-4">
        <AddressItem isDefault />
        <AddressItem isDefault={false} />
        <AddressItem isDefault={false} />
      </div>

      <AddAddressModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default AccountAddress;
