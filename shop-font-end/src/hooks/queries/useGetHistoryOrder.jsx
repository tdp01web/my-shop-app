import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetHistoryOrder = (id, { onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["get-history-order", id],
    queryFn: async () => {
      try {
        const apiResult = await instance.get(`historyOrder/getHistoryOrder/${id}`);
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },
  });
};