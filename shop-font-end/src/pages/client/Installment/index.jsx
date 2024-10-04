import React from 'react'
import Method1 from "./component/Method1";

import Method2 from './component/Method2';
import Method3 from './component/Method3';
import Method4 from './component/Method4';

const Installment = () => {
  return (
    <>
      
       
          <div className=" relative z-20 flex flex-col gap-4 2xl:w-[80%] 2xl:mx-auto md:px-10 my-[50px] w-full ">
            <Method1 />
            
          </div>
       
      
      <div class=" bg-white  ">
        <div className=" relative z-20 flex flex-col gap-4 2xl:w-[80%] 2xl:mx-auto md:px-10 my-[50px] w-full ">
          <Method4 />
        </div>
      </div>
    </>
  );
};

export default Installment;