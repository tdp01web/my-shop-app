import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetGPUByID = (id, { onSuccess, onError } = {}) => {
	return useQuery({
		queryKey: ["get-all-gpu", id],
		queryFn: async () => {
			try {
				const apiResult = await instance.get(`gpu/getGPU/${id}`);
				onSuccess?.(apiResult);
				return apiResult;
			} catch (error) {
				onError?.(error);
				throw error;
			}
		},
	});
};
