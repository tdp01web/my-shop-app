import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteBlog = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-blog"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .post(`blog/deleteBlog/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
