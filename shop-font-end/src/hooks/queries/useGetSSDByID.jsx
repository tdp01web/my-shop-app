import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetSSDByID = (id, { onSuccess, onError } = {}) => {
	return useQuery({
		queryKey: ["get-all-ssd", id],
		queryFn: async () => {
			try {
				const apiResult = await instance.get(`ssd/getSSD/${id}`);
				onSuccess?.(apiResult);
				return apiResult;
			} catch (error) {
				onError?.(error);
				throw error;
			}
		},
	});
};
