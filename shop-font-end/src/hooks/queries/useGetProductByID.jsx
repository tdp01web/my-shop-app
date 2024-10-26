import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetProductByID = (id, { onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["get-all-products", id],
    queryFn: async () => {
      try {
        const apiResult = await instance.get(`product/getaProduct/${id}`);
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },
  });
};