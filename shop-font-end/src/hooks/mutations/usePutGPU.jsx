import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutGPU = (id, { onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-gpu", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`gpu/updateGPU/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
