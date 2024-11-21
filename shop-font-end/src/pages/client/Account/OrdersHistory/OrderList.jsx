import { Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";

const MAX_SHOW = 2;

const OrderCard = ({ data }) => {
  const [limitShow, setLimitShow] = useState(MAX_SHOW);

  const onToggleShow = () => {
    setLimitShow(
      limitShow < data.products.length ? data.products.length : MAX_SHOW
    );
  };

  const isShowFull = limitShow === data.products.length;

  return (
    <div className="pt-4 px-6 pb-6 rounded bg-white [&:not(:last-child)]:mb-4">
      <div className="flex items-center justify-between pb-4 border-b border-[#CFCFCF]">
        <p className="text-[#6d6e72] text-[14px] font-semibold">
          {data.orderStatus}
        </p>

        <p className="text-[14px] text-[#111] font-semibold">#{data._id}</p>
      </div>

      <div className="py-4 border-b border-[#CFCFCF] mb-3">
        {data.products.slice(0, limitShow).map((product) => (
          <div className="flex items-center" key={product.id}>
            <div className="p-2 w-3/4 flex items-center gap-x-2">
              <div className="w-[90px] h-[90px] border border-[#eee] rounded overflow-hidden relative">
                <img
                  src={product?.images?.[0]?.url}
                  alt="Product image"
                  className="block w-full h-full object-cover"
                />

                <p className="absolute bottom-0 right-0 w-6 h-6 bg-[#ececec] rounded-tl flex items-center justify-center text-[12px] text-[#6d6e72] font-semibold">
                  x{product.count}
                </p>
              </div>

              <div className="flex-1">
                <Link
                  to={`/products/${product.prodId}`}
                  className="text-[#111] font-semibold"
                >
                  {product?.title} | {product?.gpu} | {product?.ram} |{" "}
                  {product?.storage}
                </Link>
              </div>
            </div>

            <div className="w-1/4 text-[#111] text-right">
              <p>{(product.count * product.price).toLocaleString()}đ</p>
              {/* <p className="line-through text-[14px]">38.990.000₫</p> */}
            </div>
          </div>
        ))}
      </div>

      {data.products.length > MAX_SHOW && (
        <Button className="rounded" onClick={onToggleShow}>
          {isShowFull ? "Ẩn bớt" : "Xem thêm "}{" "}
          {data.products.length - MAX_SHOW} sản phẩm
        </Button>
      )}

      <div className="flex items-center justify-between">
        <p>Đặt lúc: {dayjs(data.createdAt).format("HH:mm DD.MM.YYYY")}</p>

        <div className="text-right">
          <p>
            <span>Tổng tiền: </span>
            <span className="text-[#e30019] font-semibold">
              {data.totalPrice.toLocaleString()}đ
            </span>
          </p>

          <Link
            to={`/account/orders/${data._id}`}
            className="border border-[#1982f9] rounded px-3 h-9 text-[14px] text-[#1982f9] inline-flex items-center mt-2"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  data: {},
};

const OrderList = ({ data = [] }) => {
  return (
    <div className="bg-[#ececec]">
      {data.map((it) => (
        <OrderCard key={it._id} data={it} />
      ))}
    </div>
  );
};

OrderList.propTypes = {
  data: Array,
};

export default OrderList;
