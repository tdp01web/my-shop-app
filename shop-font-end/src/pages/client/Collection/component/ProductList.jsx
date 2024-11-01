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
  const [selectedCpu, setSelectedCpu] = useState([]);
  const [selectedVga, setSelectedVga] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedLcd, setSelectedLcd] = useState([]);
  const [selectedSSD, setSelectedSSD] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000000]);

  const {
    ramSizes,
    Cpunames,
    Brand,
    LCD,
    SSDnames,
    Vganames,
    priceNames,
    sortedProducts,
    sortProducts,
  } = useProductFilters(
    products,
    priceRange,
    selectedIndices,
    selectedCpu,
    selectedVga,
    selectedBrand,
    selectedLcd,
    selectedSSD
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
        Cpunames={Cpunames}
        selectedCpu={selectedCpu}
        setSelectedCpu={setSelectedCpu}
      />
    ),
    (props) => (
      <RAMFilter
        ramSizes={ramSizes}
        selectedIndices={selectedIndices}
        setSelectedIndices={setSelectedIndices}
      />
    ),
    (props) => (
      <SSDFilter
        SSDnames={SSDnames}
        selectedSSD={selectedSSD}
        setSelectedSSD={setSelectedSSD}
      />
    ),
    (props) => (
      <SizeFilter
        LCD={LCD}
        selectedLcd={selectedLcd}
        setSelectedLcd={setSelectedLcd}
      />
    ),
    NeedFilter,
    (props) => (
      <VGAFilter
        Vganames={Vganames}
        selectedVga={selectedVga}
        setSelectedVga={setSelectedVga}
      />
    ),
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
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, index) => (
            <Product key={product.id || index} {...product} />
          ))
        ) : (
          <div>Không có sản phẩm nào trong tầm giá này.</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
