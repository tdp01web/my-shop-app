import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutBlog = (id ,{ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-blog", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`blog/updateBlog/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
