import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteComments = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-comments"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .post(`product/deleteComment/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
