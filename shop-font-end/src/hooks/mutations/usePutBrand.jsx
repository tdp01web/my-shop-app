import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutBrand = (id ,{ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-brand", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`brand/updateBrand/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
