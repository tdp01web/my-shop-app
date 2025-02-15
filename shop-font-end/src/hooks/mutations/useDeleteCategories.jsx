import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteCategory = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .post(`category/deleteCategory/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
