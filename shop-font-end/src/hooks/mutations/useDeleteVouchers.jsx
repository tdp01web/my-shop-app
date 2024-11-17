import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const useDeleteVouchers = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["delete-vouchers"],
    mutationFn: async (id) => {
      try {
        const apiResult = await instance
          .delete(`coupon/deleteCoupon/${id}`, id)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
