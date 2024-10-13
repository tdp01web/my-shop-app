import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetBrandByID = (id, { onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["get-all-brand", id],
    queryFn: async () => {
      try {
        const apiResult = await instance.get(`brand/getBrand/${id}`);
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },
  });
};