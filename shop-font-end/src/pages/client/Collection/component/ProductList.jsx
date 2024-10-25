// components/ProductList/ProductList.js

import { useState } from "react";
import Product from "../../../../components/Product";
import { Box } from "@mui/material";
import BrandFilter from "./Filter/BrandFilter";
import CPUFilter from "./Filter/CPUFilter";
import RAMFilter from "./Filter/RAMFilter";
import SizeFilter from "./Filter/SizeFilter";
import NeedFilter from "./Filter/NeedFilter";
import VGAFilter from "./Filter/VGAFilter";
import SSDFilter from "./Filter/SSDFilter";
import TotalFilter from "./Filter/TotalFilter";
import StatusFilter from "./Filter/StatusFilter";
import PriceFilter from "./Filter/PriceFilter";
import ArrangeFilter from "./Filter/ArrangeFilter";
import useProductFilters from "../../../../hooks/useFilter/useProductFilters";

/* eslint-disable react/prop-types */
const ProductList = ({ products }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedGpu, setSelectedGpu] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedLcd, setSelectedLcd] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000000]);

  const {
    ProductsMessage,
    noProductsMessage,
    ramSizes,
    Gpunames,
    Brand,
    LCD,
    priceNames,
    sortedProducts,
    sortProducts,
  } = useProductFilters(
    products,
    priceRange,
    selectedIndices,
    selectedGpu,
    selectedBrand,
    selectedLcd
  );

  const filters = [
    TotalFilter,
    StatusFilter,
    (props) => (
      <PriceFilter
        priceNames={priceNames}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
    ),
    (props) => (
      <BrandFilter
        Brand={Brand}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />
    ),
    (props) => (
      <CPUFilter
        Gpunames={Gpunames}
        selectedGpu={selectedGpu}
        setSelectedGpu={setSelectedGpu}
      />
    ),
    (props) => (
      <RAMFilter
        ramSizes={ramSizes}
        selectedIndices={selectedIndices}
        setSelectedIndices={setSelectedIndices}
      />
    ),
    SSDFilter,
    (props) => (
      <SizeFilter
        LCD={LCD}
        selectedLcd={selectedLcd}
        setSelectedLcd={setSelectedLcd}
      />
    ),
    NeedFilter,
    VGAFilter,
  ];

  return (
    <div className="w-full bg-cover flex bg-white rounded-sm flex-col bg-center gap-3 h-auto p-4">
      <Box
        display="flex"
        alignItems="center"
        className="w-full mb-4"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <div className="block md:hidden w-full flex justify-between">
          <TotalFilter />
          <ArrangeFilter onSortChange={sortProducts} />
        </div>
        <div className="hidden md:flex gap-2 flex-wrap">
          {filters.map((FilterComponent, index) => (
            <FilterComponent key={index} />
          ))}
        </div>
      </Box>
      <div className="md:flex hidden" style={{ marginLeft: "auto" }}>
        <ArrangeFilter onSortChange={sortProducts} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5">
        {noProductsMessage && <div>{noProductsMessage}</div>}
        {sortedProducts.map((product, index) => (
          <Product key={product.id || index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
