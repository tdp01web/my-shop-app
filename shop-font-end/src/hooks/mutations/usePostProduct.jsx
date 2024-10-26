import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostProduct = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-product"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("product/create", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
