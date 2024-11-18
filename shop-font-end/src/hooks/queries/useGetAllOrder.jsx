import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllOrders = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-orders"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("order/my-orders");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};