import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePutVouchers = (id ,{ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["put-vouchers", id],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .put(`coupon/updateCoupon/${id}`, data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
