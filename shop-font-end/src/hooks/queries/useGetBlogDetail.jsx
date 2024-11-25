import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetBlogByID = (id, { onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["get-all-blog", id],
    queryFn: async () => {
      try {
        const apiResult = await instance.get(`blog/getBlog/${id}`);
        onSuccess?.(apiResult);
        return apiResult;
      } catch (error) {
        onError?.(error);
        throw error;
      }
    },
  });
};