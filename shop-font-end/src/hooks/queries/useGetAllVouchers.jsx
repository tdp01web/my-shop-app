import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllVouchers = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-vouchers"],
    queryFn: async () => {
      try {
        const apiResult = await instance.get("coupon/getallCoupons");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};