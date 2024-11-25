import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostBlog = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-blog"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("blog/createBlog", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
