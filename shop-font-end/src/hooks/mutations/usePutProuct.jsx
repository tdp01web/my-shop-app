import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutProduct = (id, { onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-product", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`product/updateProduct/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
