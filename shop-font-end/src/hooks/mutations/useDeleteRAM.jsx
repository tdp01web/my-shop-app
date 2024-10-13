import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteRAM = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-ram"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .delete(`ram/deleteRAM/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
