import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllComments = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-comments"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("product/get-all-comments");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};