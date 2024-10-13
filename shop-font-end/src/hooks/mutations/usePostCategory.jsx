import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostCategory = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-category"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("category/createCategory", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
