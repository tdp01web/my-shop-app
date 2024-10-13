import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetCPUByID = (id, { onSuccess, onError } = {}) => {
	return useQuery({
		queryKey: ["get-all-cpu", id],
		queryFn: async () => {
			try {
				const apiResult = await instance.get(`cpu/getCPU/${id}`);
				onSuccess?.(apiResult);
				return apiResult;
			} catch (error) {
				onError?.(error);
				throw error;
			}
		},
	});
};
