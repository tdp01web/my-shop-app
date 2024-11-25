import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBlog = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["get-all-blog"],

    queryFn: async () => {
      try {
        const apiResult = await instance.get("Blog/getAllBlog");
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
      }
    },
  });
};