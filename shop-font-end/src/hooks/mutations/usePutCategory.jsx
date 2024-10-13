import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutCategory = (id ,{ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-category", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`category/updateCategory/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
