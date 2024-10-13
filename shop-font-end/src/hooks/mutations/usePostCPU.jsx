import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostCPU = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-cpu"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("cpu/createCPU", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
