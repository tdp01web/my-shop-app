import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutRAM = (id, { onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-ram", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`ram/updateRAM/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
