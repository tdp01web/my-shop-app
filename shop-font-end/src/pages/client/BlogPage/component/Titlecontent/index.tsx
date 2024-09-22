import React from "react";

import Contenblog from "../Contenblog";
import Postblog from "../Postblog";
import Titleblog from "../Titleblog";
import Hottopic from "../Hottopic";
import Gametopic from "../Gametopic";
import Quickview from "../Quickview";
import Tricks from "../Tricks";

const Titlecontent = () => {
  return (
    <div className="bg-white w-full  mx-auto lg:p-4 mt-10 rounded-md">
      <div className="flex flex-wrap mt-[50px]">
        <div className="w-full sm:w-[73%] mr-[15px] ">
          <div className="flex flex-wrap mb-[20px]">
            <Postblog />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Titleblog />
          </div>
          <hr className="my-[35px]" />
          <Contenblog />
        </div>
        <div className="w-full sm:w-3/12">
          <Hottopic />
          <Gametopic />
         <Quickview/>
         <Tricks/>
        </div>
      </div>
    </div>
  );
};

export default Titlecontent;
