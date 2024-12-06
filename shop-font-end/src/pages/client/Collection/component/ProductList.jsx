import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../../../components/Product";
import useProductFilters from "../../../../hooks/useFilter/useProductFilters";
import TotalFilter from "./Filter/TotalFilter";
import ArrangeFilter from "./Filter/ArrangeFilter";
import Filters from "./Filter/FilterModule/Filters";

const ProductList = ({ products }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedCpu, setSelectedCpu] = useState([]);
  const [selectedVga, setSelectedVga] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedSSD, setSelectedSSD] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000000]);

  const location = useLocation();

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // hãng
    const brandFilter = searchParams.get("brand");
    if (brandFilter && Brand && Brand.length > 0) {
      const brand = Brand.findIndex((brand) => brand === brandFilter);
      if (brand !== -1) {
        setSelectedBrand([brand]);
      }
    }

    // Cpu
    const cpuFilter = searchParams.get("cpu");
    if (cpuFilter && Cpunames && Cpunames.length > 0) {
      const cpu = Cpunames.findIndex((cpu) => cpu === cpuFilter);
      if (cpu !== -1) {
        setSelectedCpu([cpu]);
      }
    }

    // Ram
    const ramFilter = searchParams.get("ram");
    if (ramFilter && ramSizes && ramSizes.length > 0) {
      const ram = ramSizes.findIndex((ram) => ram === ramFilter);
      if (ram !== -1) {
        setSelectedIndices([ram]);
      }
    }

    // ssd
    const ssdFilter = searchParams.get("ssd");
    if (ssdFilter && SSDnames && SSDnames.length > 0) {
      const ssd = SSDnames.findIndex((ssd) => ssd === ssdFilter);
      if (ssd !== -1) {
        setSelectedSSD([ssd]);
      }
    }

    // vga
    const vgaFilter = searchParams.get("vga");
    if (vgaFilter && Vganames && Vganames.length > 0) {
      const vga = Vganames.findIndex((vga) => vga === vgaFilter);
      if (vga !== -1) {
        setSelectedVga([vga]);
      }
    }

    // danh mục
    const categoryFilter = searchParams.get("category");
    if (categoryFilter && Category && Category.length > 0) {
      const category = Category.findIndex((cat) => cat === categoryFilter);
      if (category !== -1) {
        setSelectedCategory([category]);
      }
    }
  }, [
    location.search,
    Brand,
    Cpunames,
    ramSizes,
    SSDnames,
    Vganames,
    Category,
  ]);

  return (
    <div className="flex flex-col gap-3 bg-white bg-cover bg-center p-4 rounded-sm w-full h-auto">
      <Box
        display="flex"
        alignItems="center"
        className="mb-4 w-full"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <div className="flex justify-between md:hidden w-full">
          <TotalFilter />
          <ArrangeFilter onSortChange={sortProducts} />
        </div>
        <div className="md:flex flex-wrap gap-2 hidden">
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

      <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, index) => (
            <Product key={product.id || index} {...product} />
          ))
        ) : (
          <div>Không có sản phẩm nào</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
