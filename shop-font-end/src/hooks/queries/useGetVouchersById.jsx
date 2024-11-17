import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetVouchersByID = (id, { onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["get-all-vouchers", id],
    queryFn: async () => {
      try {
        const apiResult = await instance.get(`coupon/getaCoupons/${id}`);
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },
  });
};