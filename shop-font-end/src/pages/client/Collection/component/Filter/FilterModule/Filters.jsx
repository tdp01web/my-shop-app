import TotalFilter from "../TotalFilter";
import PriceFilter from "../PriceFilter";
import BrandFilter from "../BrandFilter";
import RAMFilter from "../RAMFilter";
import CPUFilter from "../CPUFilter";
import SSDFilter from "../SSDFilter";
import SizeFilter from "../SizeFilter";
import VGAFilter from "../VGAFilter";

/* eslint-disable react/prop-types */
const Filters = ({
  ramSizes,
  Cpunames,
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
  selectedIndices,
  selectedLcd,
  setSelectedIndices,
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
        Cpunames={Cpunames}
        Brand={Brand}
        LCD={LCD}
        SSDnames={SSDnames}
        Vganames={Vganames}
        priceNames={priceNames}
        selectedSSD={selectedSSD}
        selectedIndices={selectedIndices}
        setSelectedIndices={setSelectedIndices}
        selectedLcd={selectedLcd}
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
      <VGAFilter
        Vganames={Vganames}
        selectedVga={selectedVga}
        setSelectedVga={setSelectedVga}
      />
    </>
  );
};

export default Filters;
