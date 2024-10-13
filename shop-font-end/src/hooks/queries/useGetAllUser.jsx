import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUser = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-user"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("user/all-user");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};