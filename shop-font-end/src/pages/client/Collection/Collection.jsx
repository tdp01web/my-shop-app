import SvgIcon from "@mui/material/SvgIcon";
import { useQuery } from "@tanstack/react-query";
import { instance } from "./../../../configs/instance";
import ProductList from "./component/ProductList";
import Loader from "../../../components/Loading";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Collection = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      const { data } = await instance.get("/product/getAllProduct");
      console.log(
        "data",
        data.filter((product) => product.status === 1)
      );
      return data.filter((product) => product.status === 1);
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="mx-auto w-80%">
        Failed to load products. Please try again.
      </div>
    );
  // console.log(products);

  return (
    <div className="relative z-20 flex flex-col gap-6 2xl:mx-auto md:px-10 2xl:w-[80%]">
      <img
        src="images/homepage/headblog_banner.webp"
        className="shadow-md rounded-lg w-full h-auto"
      />
      <div className="mx-auto w-full">
        <ProductList products={products.filter((product) => product.status === 1)} />
      </div>
    </div>
  );
};

export default Collection;
