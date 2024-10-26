import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-products"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("product/getAllProduct");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};