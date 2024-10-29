import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutOrder = (id ,{ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-order", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`order/update-status/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};