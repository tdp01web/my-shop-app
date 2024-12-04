import useArrangeFilter from "./component/useArrangeFilter";
import useBrandFilter from "./component/useBrandFilter";
import useCategoryFilter from "./component/useCategoryFilter";
import useCpuFilter from "./component/useCpuFilter";
import usePriceFilter from "./component/usePriceFilter";
import useRamFilter from "./component/useRamFilter";
import useSSDFilter from "./component/useSSDFilter";
import useVgaFilter from "./component/useVgaFilter";

const useProductFilters = (
  products,
  priceRange,
  selectedIndices,
  selectedCpu,
  selectedVga,
  selectedBrand,
  selectedSSD,
  selectedCategory
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

  const { SSDnames, filteredProducts: filteredBySSD } = useSSDFilter(
    filteredByBrand,
    selectedSSD
  );

  const { Category, filteredProducts: filteredByCategory } = useCategoryFilter(
    filteredBySSD,
    selectedCategory
  );

  const { sortedProducts, sortProducts } = useArrangeFilter(filteredByCategory);

  return {
    noProductsMessage,
    ramSizes,
    Cpunames,
    Vganames,
    Brand,
    SSDnames,
    Category,
    priceNames,
    filteredProducts: filteredByCategory,
    sortedProducts,
    sortProducts,
  };
};

export default useProductFilters;
