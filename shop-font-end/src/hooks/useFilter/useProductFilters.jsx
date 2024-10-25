// hooks/useProductFilters.js

import useRamFilter from "./component/useRamFilter";
import useGpuFilter from "./component/useGpuFilter";
import useBrandFilter from "./component/useBrandFilter";
import useLcdFilter from "./component/useLcdFilter";
import usePriceFilter from "./component/usePriceFilter";
import useArrangeFilter from "./component/useArrangeFilter";

const useProductFilters = (
  products,
  priceRange,
  selectedIndices,
  selectedGpu,
  selectedBrand,
  selectedLcd
) => {
  const { ProductsMessage, noProductsMessage } = usePriceFilter(
    products,
    priceRange
  );

  const { ramSizes, filteredProducts: filteredByRam } = useRamFilter(
    products,
    selectedIndices
  );
  const { Gpunames, filteredProducts: filteredByGpu } = useGpuFilter(
    filteredByRam,
    selectedGpu
  );
  const { Brand, filteredProducts: filteredByBrand } = useBrandFilter(
    filteredByGpu,
    selectedBrand
  );
  const { LCD, filteredProducts: filteredByLcd } = useLcdFilter(
    filteredByBrand,
    selectedLcd
  );
  const { priceNames, filteredProducts } = usePriceFilter(
    filteredByLcd,
    priceRange
  );
  const { sortedProducts, sortProducts } = useArrangeFilter(filteredProducts);

  return {
    ProductsMessage,
    noProductsMessage,
    ramSizes,
    Gpunames,
    Brand,
    LCD,
    priceNames,
    filteredProducts,
    sortedProducts,
    sortProducts,
  };
};
export default useProductFilters;
