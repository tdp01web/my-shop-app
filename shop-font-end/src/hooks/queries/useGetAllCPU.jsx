import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCPU = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-cpu"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("cpu/getAllCPU");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};