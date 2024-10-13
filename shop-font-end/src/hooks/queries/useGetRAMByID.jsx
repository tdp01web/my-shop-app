import { instance } from "../../configs/instance";
import { useQuery } from "@tanstack/react-query";

export const useGetRAMByID = (id, { onSuccess, onError } = {}) => {
	return useQuery({
		queryKey: ["get-all-ram", id],
		queryFn: async () => {
			try {
				const apiResult = await instance.get(`ram/getRAM/${id}`);
				onSuccess?.(apiResult);
				return apiResult;
			} catch (error) {
				onError?.(error);
				throw error;
			}
		},
	});
};
