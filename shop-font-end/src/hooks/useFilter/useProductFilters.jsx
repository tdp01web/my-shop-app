import useRamFilter from "./component/useRamFilter";
import usePriceFilter from "./component/usePriceFilter";
import useCpuFilter from "./component/useCpuFilter";
import useVgaFilter from "./component/useVgaFilter";
import useBrandFilter from "./component/useBrandFilter";
import useLcdFilter from "./component/useLcdFilter";
import useSSDFilter from "./component/useSSDFilter";
import useArrangeFilter from "./component/useArrangeFilter";

const useProductFilters = (
  products,
  priceRange,
  selectedIndices,
  selectedCpu,
  selectedVga,
  selectedBrand,
  selectedLcd,
  selectedSSD
) => {
  const {
    priceNames,
    filteredProducts: filteredByPrice,
    noProductsMessage,
  } = usePriceFilter(products, priceRange);

  const { ramSizes, filteredProducts: filteredByRam } = useRamFilter(
    filteredByPrice,
    selectedIndices
  );

  const { Cpunames, filteredProducts: filteredByCpu } = useCpuFilter(
    filteredByRam,
    selectedCpu
  );

  const { Vganames, filteredProducts: filteredByVga } = useVgaFilter(
    filteredByCpu,
    selectedVga
  );

  const { Brand, filteredProducts: filteredByBrand } = useBrandFilter(
    filteredByVga,
    selectedBrand
  );

  const { LCD, filteredProducts: filteredByLcd } = useLcdFilter(
    filteredByBrand,
    selectedLcd
  );

  const { SSDnames, filteredProducts: filteredBySSD } = useSSDFilter(
    filteredByLcd,
    selectedSSD
  );

  const { sortedProducts, sortProducts } = useArrangeFilter(filteredBySSD);

  return {
    noProductsMessage,
    ramSizes,
    Cpunames,
    Vganames,
    Brand,
    LCD,
    SSDnames,
    priceNames,
    filteredProducts: filteredBySSD,
    sortedProducts,
    sortProducts,
  };
};

export default useProductFilters;
