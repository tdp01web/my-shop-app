import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderByID = (id, { onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["get-all-orders", id],
    queryFn: async () => {
      try {
        const apiResult = await instance.get(`order/${id}`);
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },
  });
};