import React from 'react'
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
const Title = () => {
  return (
    <div className="lg:w-[100%] lg:mx-auto lg:mt-0 ml-3 mt-3 flex gap-3 whitespace-nowrap font-400 overflow-hidden">
      <Link to={"/"} className="text-[#1982F9]">
       
        <HomeIcon />
        Trang chủ
      </Link>
      
      /<span className="text-[#828588]">Tất cả bài viết</span>
    </div>
  );
}

export default Title;