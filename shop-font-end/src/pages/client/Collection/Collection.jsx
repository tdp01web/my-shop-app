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
      console.log(data);

      return data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="w-80% mx-auto ">
        Failed to load products. Please try again.
      </div>
    );
  // console.log(products);

  return (
    <div className="relative z-20 flex flex-col gap-6 2xl:w-[80%] 2xl:mx-auto md:px-10">
      <img
        src="images/homepage/headblog_banner.webp"
        className="w-full h-auto rounded-lg shadow-md"
      />
      <div className="mx-auto w-full">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Collection;
