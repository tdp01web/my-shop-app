import TotalFilter from "../TotalFilter";
import PriceFilter from "../PriceFilter";
import BrandFilter from "../BrandFilter";
import RAMFilter from "../RAMFilter";
import CPUFilter from "../CPUFilter";
import SSDFilter from "../SSDFilter";
import SizeFilter from "../SizeFilter";
import VGAFilter from "../VGAFilter";
import CategoryFilter from "../CategoryFilter";

/* eslint-disable react/prop-types */
const Filters = ({
  ramSizes,
  Cpunames,
  Category,
  Brand,
  LCD,
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
  selectedLcd,
  setSelectedIndices,
  setSelectedCategory,
  setSelectedLcd,
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
        LCD={LCD}
        SSDnames={SSDnames}
        Vganames={Vganames}
        priceNames={priceNames}
        selectedSSD={selectedSSD}
        selectedCategory={selectedCategory}
        selectedIndices={selectedIndices}
        setSelectedIndices={setSelectedIndices}
        selectedLcd={selectedLcd}
        setSelectedCategory={setSelectedCategory}
        setSelectedLcd={setSelectedLcd}
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
      <SizeFilter
        LCD={LCD}
        selectedLcd={selectedLcd}
        setSelectedLcd={setSelectedLcd}
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
