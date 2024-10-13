import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteCPU = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-cpu"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .delete(`cpu/deleteCPU/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
