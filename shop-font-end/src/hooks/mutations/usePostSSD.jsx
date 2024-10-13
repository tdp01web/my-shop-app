import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostSSD = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-ssd"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("ssd/createSSD", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
