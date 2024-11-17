import { useMutation } from "@tanstack/react-query";
import { instance } from "../../configs/instance";


export const usePostVouchers = ({ onSuccess, onError }) => {
  return useMutation({
    mutationKey: ["post-vouchers"],
    mutationFn: async (data) => {
      try {
        const apiResult = await instance
          .post("coupon/createCoupon", data)
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};
