import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetUserByID = (id, { onSuccess, onError } = {}) => {
	return useQuery({
		queryKey: ["get-all-user", id],
		queryFn: async () => {
			try {
				const apiResult = await instance.get(`user/getUser/${id}`);
				onSuccess?.(apiResult);
				return apiResult;
			} catch (error) {
				onError?.(error);
				throw error;
			}
		},
	});
};
