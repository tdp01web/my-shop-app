import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllGPU = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-gpu"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("gpu/getAllGPU");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};