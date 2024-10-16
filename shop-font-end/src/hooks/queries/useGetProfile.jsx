import { useQuery } from "@tanstack/react-query";
import { instance } from "../../configs/instance";

const useGetProfile = () => {
  const getProfileQuery = useQuery({
    queryKey: ["PROFILE"],
    queryFn: async () => {
      const isLogged = localStorage.getItem("token");

      if (!isLogged) {
        return Promise.resolve(null);
      }

      const user = JSON.parse(localStorage.getItem("user"));
      const res = await instance.get("/user/getUser/" + user._id);

      return res.data;
    },
  });

  return getProfileQuery;
};

export default useGetProfile;
