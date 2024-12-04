import BrandFilter from "../BrandFilter";
import CPUFilter from "../CPUFilter";
import CategoryFilter from "../CategoryFilter";
import PriceFilter from "../PriceFilter";
import RAMFilter from "../RAMFilter";
import SSDFilter from "../SSDFilter";
import TotalFilter from "../TotalFilter";
import VGAFilter from "../VGAFilter";

/* eslint-disable react/prop-types */
const Filters = ({
  ramSizes,
  Cpunames,
  Category,
  Brand,
  SSDnames,
  Vganames,
  priceNames,
  selectedCpu,
  selectedVga,
  selectedBrand,
  priceRange,
  selectedSSD,
  selectedCategory,
  selectedIndices,
  setSelectedIndices,
  setSelectedCategory,
  setSelectedCpu,
  setSelectedVga,
  setSelectedBrand,
  setPriceRange,
  setSelectedSSD,
}) => {
  return (
    <>
      <TotalFilter
        selectedCpu={selectedCpu}
        selectedVga={selectedVga}
        selectedBrand={selectedBrand}
        priceRange={priceRange}
        ramSizes={ramSizes}
        Category={Category}
        Cpunames={Cpunames}
        Brand={Brand}
        SSDnames={SSDnames}
        Vganames={Vganames}
        priceNames={priceNames}
        selectedSSD={selectedSSD}
        selectedCategory={selectedCategory}
        selectedIndices={selectedIndices}
        setSelectedIndices={setSelectedIndices}
        setSelectedCategory={setSelectedCategory}
        setSelectedCpu={setSelectedCpu}
        setSelectedVga={setSelectedVga}
        setSelectedBrand={setSelectedBrand}
        setPriceRange={setPriceRange}
        setSelectedSSD={setSelectedSSD}
      />
      <PriceFilter
        priceNames={priceNames}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <BrandFilter
        Brand={Brand}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />

      <CPUFilter
        Cpunames={Cpunames}
        selectedCpu={selectedCpu}
        setSelectedCpu={setSelectedCpu}
      />
      <RAMFilter
        ramSizes={ramSizes}
        selectedIndices={selectedIndices}
        setSelectedIndices={setSelectedIndices}
      />
      <SSDFilter
        SSDnames={SSDnames}
        selectedSSD={selectedSSD}
        setSelectedSSD={setSelectedSSD}
      />
      <CategoryFilter
        Category={Category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <VGAFilter
        Vganames={Vganames}
        selectedVga={selectedVga}
        setSelectedVga={setSelectedVga}
      />
    </>
  );
};

export default Filters;
