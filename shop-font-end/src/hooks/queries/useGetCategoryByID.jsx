import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoryByID = (id, { onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["get-all-category", id],
    queryFn: async () => {
      try {
        const apiResult = await instance.get(`category/getCategory/${id}`);
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },
  });
};