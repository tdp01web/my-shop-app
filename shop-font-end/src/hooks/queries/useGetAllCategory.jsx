import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategory = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-category"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("category/getAllCategory");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};