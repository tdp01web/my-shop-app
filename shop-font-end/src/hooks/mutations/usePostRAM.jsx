import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostRAM = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-ram"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("ram/createRAM", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
