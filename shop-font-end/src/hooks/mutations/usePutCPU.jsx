import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutCPU = (id, { onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-cpu", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`cpu/updateCPU/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
