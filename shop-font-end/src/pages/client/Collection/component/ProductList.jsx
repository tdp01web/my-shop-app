import { useEffect, useState } from "react";
import Product from "../../../../components/Product";
import StatusFilter from "./Filter/StatusFilter";
import TotalFilter from "./Filter/TotalFilter";
import { Box } from "@mui/material";
import PriceFilter from "./Filter/PriceFilter";
import BrandFilter from "./Filter/BrandFilter";
import CPUFilter from "./Filter/CPUFilter";
import RAMFilter from "./Filter/RAMFilter";
import SSDFilter from "./Filter/SSDFilter";
import SizeFilter from "./Filter/SizeFilter";
import NeedFilter from "./Filter/NeedFilter";
import VGAFilter from "./Filter/VGAFilter";
import ArrangeFilter from "./Filter/ArrangeFilter";

/* eslint-disable react/prop-types */
const ProductList = ({ products }) => {
  // RAM
  const [ramSizes, setRamSizes] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  // GPU
  const [Gpunames, setGpunames] = useState([]);
  const [selectedGpu, setSelectedGpu] = useState([]);
  // Brand
  const [Brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);

  // Lấy kích thước RAM từ sản phẩm ban đầu
  useEffect(() => {
    if (products) {
      const sizes = new Set();
      products.forEach((product) =>
        product.variants.forEach((variant) => {
          if (variant.ram && variant.ram.size) {
            sizes.add(variant.ram.size);
          }
        })
      );
      setRamSizes(Array.from(sizes));
    }
  }, [products]);
  // Lấy kích thước GPU từ sản phẩm ban đầu
  useEffect(() => {
    if (products) {
      const names = new Set();
      products.forEach((product) =>
        product.variants.forEach((variant) => {
          if (variant.gpu && variant.gpu.name) {
            names.add(variant.gpu.name);
          }
        })
      );
      setGpunames(Array.from(names));
    }
  }, [products]);

  // Lấy dữ liệu Brand từ sản phẩm ban đầu
  useEffect(() => {
    if (products) {
      const brandSet = new Set();
      products.forEach((product) => {
        if (product.brand && product.brand.title) {
          brandSet.add(product.brand.title);
        }
      });
      setBrand(Array.from(brandSet));
    }
  }, [products]);

  // Lọc sản phẩm dựa trên kích thước RAM được chọn
  useEffect(() => {
    if (selectedIndices.length === 0) {
      setFilteredProducts(products); // Không chọn RAM thì hiển thị tất cả
    } else {
      const selectedRAMs = selectedIndices.map((index) => ramSizes[index]); // Lấy RAM được chọn
      const newFilteredProducts = products.filter((product) =>
        product.variants.some((variant) =>
          selectedRAMs.includes(variant.ram.size)
        )
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [selectedIndices, ramSizes, products]);
  // Lọc sản phẩm dựa trên kích thước GPU được chọn
  useEffect(() => {
    if (selectedGpu.length === 0) {
      setFilteredProducts(products); // Không chọn GPU thì hiển thị tất cả
    } else {
      const selectedGPU = selectedGpu.map((index) => Gpunames[index]); // Lấy GPU được chọn
      const newFilteredGpu = products.filter((product) =>
        product.variants.some((variant) =>
          selectedGPU.includes(variant.gpu.name)
        )
      );
      setFilteredProducts(newFilteredGpu);
    }
  }, [selectedGpu, Gpunames, products]);

  // Lọc sản phẩm dựa trên Brand được chọn
  useEffect(() => {
    if (selectedBrand.length === 0) {
      setFilteredProducts(products);
    } else {
      const selectedBrandTitles = selectedBrand
        .map((index) => Brand[index])
        .filter(Boolean);
      const newFilteredProducts = products.filter((product) =>
        selectedBrandTitles.includes(product.brand.title)
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [selectedBrand, Brand, products]);

  const filters = [
    TotalFilter,
    StatusFilter,
    PriceFilter,
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
    SizeFilter,
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
          <ArrangeFilter />
        </div>
        <div className="hidden md:flex gap-2 flex-wrap">
          {filters.map((FilterComponent, index) => (
            <FilterComponent key={index} />
          ))}
        </div>
      </Box>
      <div className="md:flex hidden" style={{ marginLeft: "auto" }}>
        <ArrangeFilter />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5">
        {filteredProducts.map((product, index) => (
          <Product key={product.id || index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
