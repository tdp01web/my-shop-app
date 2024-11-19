import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteProduct = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .post(`product/deleteProduct/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
