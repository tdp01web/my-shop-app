import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBrand = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-brand"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("brand/getAllBrand");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};