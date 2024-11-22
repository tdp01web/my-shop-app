import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutUser = (id, { onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-user", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`user/update-user-admin/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
