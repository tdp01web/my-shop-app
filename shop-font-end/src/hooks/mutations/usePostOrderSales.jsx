import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostOrderSales = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-order-sales"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("order/sales", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
