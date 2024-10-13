import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostGPU = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-gpu"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("gpu/createGPU", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
