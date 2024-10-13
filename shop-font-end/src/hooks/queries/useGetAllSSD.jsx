import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSSD = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-ssd"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("ssd/getAllSSD");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};