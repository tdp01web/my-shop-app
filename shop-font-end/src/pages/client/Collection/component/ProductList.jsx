import React from "react";
import Product from "../../../../components/Product";
import StatusFilter from "./Filter/StatusFilter";
import TotalFilter from "./Filter/TotalFilter";
import { Box } from '@mui/material';
import PriceFilter from "./Filter/PriceFilter";
import BrandFilter from "./Filter/BrandFilter";
import CPUFilter from "./Filter/CPUFilter";
import RAMFilter from "./Filter/RAMFilter";
import SSDFilter from "./Filter/SSDFilter";
import SizeFilter from "./Filter/SizeFilter";
import NeedFilter from "./Filter/NeedFilter";
import VGAFilter from "./Filter/VGAFilter";
import ArrangeFilter from "./Filter/ArrangeFilter";

// import { SampleNextArrow, SamplePrevArrow } from "./CarouselSlider";

const ProductList = ({
 
  products,
 
}) => {


  return (
    <div className="w-full bg-cover flex bg-white rounded-sm flex-col bg-center gap-3 h-auto p-4">
         <Box display="flex"  alignItems="center">
      <TotalFilter /><Box ml={1} />
      <StatusFilter /><Box ml={1} />
      <PriceFilter /> <Box ml={1} />
      <BrandFilter /><Box ml={1} />
      <CPUFilter /><Box ml={1} />
      <RAMFilter /><Box ml={1} />
      <SSDFilter /><Box ml={1} />
      <SizeFilter /> <Box ml={1} />
      <NeedFilter /> <Box ml={1} />
      <VGAFilter /> <Box ml={1} />
          </Box>
    

<ArrangeFilter />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5">
        
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
       
      </div>
    </div>
  );
};

export default ProductList;
