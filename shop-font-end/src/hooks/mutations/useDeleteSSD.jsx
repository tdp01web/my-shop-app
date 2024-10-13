import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteSSD = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-ssd"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .delete(`ssd/deleteSSD/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
