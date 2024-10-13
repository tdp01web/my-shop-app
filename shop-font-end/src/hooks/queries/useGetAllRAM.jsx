import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllRAM = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-ram"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("ram/getAllRAM");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};