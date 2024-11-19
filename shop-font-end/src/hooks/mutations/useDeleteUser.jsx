import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .post(`user/deleteUser/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
