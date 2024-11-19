import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-user"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("user/register", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
