import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteCommentsById = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-comments-detail"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .post(`product/deleteCommentDetail/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
