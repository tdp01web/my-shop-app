import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteVarriantsProuduct = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-vr-prouduct"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .post(`product/variant/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
