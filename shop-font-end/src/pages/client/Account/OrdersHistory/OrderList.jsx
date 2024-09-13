import { Button } from "antd";
import { Link } from "react-router-dom";

const OrderCard = () => {
  return (
    <div className="pt-4 px-6 pb-6 rounded bg-white [&:not(:last-child)]:mb-4">
      <div className="flex items-center justify-between pb-4 border-b border-[#CFCFCF]">
        <p className="text-[#6d6e72] text-[14px] font-semibold">Đã huỷ</p>

        <p className="text-[14px] text-[#111] font-semibold">#206543</p>
      </div>

      <div className="py-4 border-b border-[#CFCFCF]">
        <div className="flex items-center">
          <div className="p-2 w-3/4 flex items-center gap-x-2">
            <div className="w-[90px] h-[90px] border border-[#eee] rounded overflow-hidden relative">
              <img
                src="https://picsum.photos/200/300"
                alt="Product image"
                className="block w-full h-full object-cover"
              />

              <p className="absolute bottom-0 right-0 w-6 h-6 bg-[#ececec] rounded-tl flex items-center justify-center text-[12px] text-[#6d6e72] font-semibold">
                x2
              </p>
            </div>

            <div className="flex-1">
              <p className="text-[#111] font-semibold">
                PC GVN x AORUS MASTER (Intel i9-14900K/ VGA RTX 4090)
              </p>
            </div>
          </div>

          <div className="w-1/4 text-[#111] text-right">
            <p>38.990.000₫</p>
            <p className="line-through text-[14px]">38.990.000₫</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-2 w-3/4 flex items-center gap-x-2">
            <div className="w-[90px] h-[90px] border border-[#eee] rounded overflow-hidden relative">
              <img
                src="https://picsum.photos/200/300"
                alt="Product image"
                className="block w-full h-full object-cover"
              />

              <p className="absolute bottom-0 right-0 w-6 h-6 bg-[#ececec] rounded-tl flex items-center justify-center text-[12px] text-[#6d6e72] font-semibold">
                x2
              </p>
            </div>

            <div className="flex-1">
              <p className="text-[#111] font-semibold">
                PC GVN x AORUS MASTER (Intel i9-14900K/ VGA RTX 4090)
              </p>
            </div>
          </div>

          <div className="w-1/4 text-[#111] text-right">
            <p>38.990.000₫</p>
            <p className="line-through text-[14px]">38.990.000₫</p>
          </div>
        </div>
      </div>

      <Button className="rounded mt-3">Xem thêm 1 sản phẩm</Button>

      <div className="text-right">
        <p>
          <span>Tổng tiền: </span>
          <span className="text-[#e30019] font-semibold">115.900.000₫</span>
        </p>

        <Link
          to="/account/orders/888"
          className="border border-[#1982f9] rounded px-3 h-9 text-[14px] text-[#1982f9] inline-flex items-center mt-2"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

const OrderList = () => {
  return (
    <div className="bg-[#ececec]">
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  );
};

export default OrderList;
