import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteGPU = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-gpu"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .post(`gpu/deleteGPU/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
