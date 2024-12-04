import { Box } from "@mui/material";
import { useState } from "react";
import Product from "../../../../components/Product";
import useProductFilters from "../../../../hooks/useFilter/useProductFilters";
import TotalFilter from "./Filter/TotalFilter";
import ArrangeFilter from "./Filter/ArrangeFilter";
import Filters from "./Filter/FilterModule/Filters";
/* eslint-disable react/prop-types */
const ProductList = ({ products }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedCpu, setSelectedCpu] = useState([]);
  const [selectedVga, setSelectedVga] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedSSD, setSelectedSSD] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000000]);

  const {
    Category,
    ramSizes,
    Cpunames,
    Brand,
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
    selectedSSD,
    selectedCategory
  );

  return (
    <div className="w-full bg-cover flex bg-white rounded-sm flex-col bg-center gap-3 h-auto p-4">
      <Box
        display="flex"
        alignItems="center"
        className="w-full mb-4"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <div className=" md:hidden w-full flex justify-between">
          <TotalFilter />
          <ArrangeFilter onSortChange={sortProducts} />
        </div>
        <div className="hidden md:flex gap-2 flex-wrap">
          <Filters
            ramSizes={ramSizes}
            Cpunames={Cpunames}
            Brand={Brand}
            Category={Category}
            SSDnames={SSDnames}
            Vganames={Vganames}
            priceNames={priceNames}
            selectedCpu={selectedCpu}
            selectedVga={selectedVga}
            selectedBrand={selectedBrand}
            priceRange={priceRange}
            selectedSSD={selectedSSD}
            selectedIndices={selectedIndices}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedIndices={setSelectedIndices}
            setSelectedCpu={setSelectedCpu}
            setSelectedVga={setSelectedVga}
            setSelectedBrand={setSelectedBrand}
            setPriceRange={setPriceRange}
            setSelectedSSD={setSelectedSSD}
          />
          <ArrangeFilter onSortChange={sortProducts} />
        </div>
      </Box>

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
