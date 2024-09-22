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

  const filters = [
    TotalFilter,
    StatusFilter,
    PriceFilter,
    BrandFilter,
    CPUFilter,
    RAMFilter,
    SSDFilter,
    SizeFilter,
    NeedFilter,
    VGAFilter,
  ];
  return (
    <div className="w-full bg-cover flex bg-white rounded-sm flex-col bg-center gap-3 h-auto p-4">
        <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
        {filters.map((FilterComponent, index) => (
        <FilterComponent key={index} />
  ))}
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
