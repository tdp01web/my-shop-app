import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Quantity from "./quantity";
const ItemProductCard = ({ item }) => {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col justify-center w-[25%]">
        <img src={item.image} alt="" srcset="" />
        <Button className="flex text-[12px] text-gray-500 hover:text-[#E30019] w-[20%] mx-auto  gap-2 items-center">
          Xóa <FaRegTrashCan />{" "}
        </Button>
      </div>
      <div>
        <Link to={`/product/${item.id}`} className="w-[50%]">
          <p className="font-semibold text-[14px]">{item.name}</p>
        </Link>
      </div>
      <div className="w-[25%]">
        <p className="font-semibold text-[20px] text-[#E30019]">
          {item.price}đ
        </p>
        <del className="text-[15px] text-gray-500">{item.priceOld}đ</del>
        <Quantity />
      </div>
    </div>
  );
};

export default ItemProductCard;
