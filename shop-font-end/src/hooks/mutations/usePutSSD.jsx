import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutSSD = (id, { onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-ssd", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`ssd/updateSSD/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
