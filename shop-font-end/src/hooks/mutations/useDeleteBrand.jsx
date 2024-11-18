import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteBrand = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-brand"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .post(`brand/deleteBrand/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
