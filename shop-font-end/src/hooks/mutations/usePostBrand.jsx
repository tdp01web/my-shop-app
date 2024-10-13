import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostBrand = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-brand"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("brand/createBrand", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
