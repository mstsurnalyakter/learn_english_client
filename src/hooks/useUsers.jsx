
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useUsers = () => {
     const axiosSecure = useAxiosSecure();

     const {
       data: users = [],
       isLoading:userLoading,
       refetch,
     } = useQuery({
       queryKey: ["users"],
       enabled: !!localStorage.getItem("access-token"),
       queryFn: async () => {
         const { data } = await axiosSecure(`/users`);
         return data;
       },
     });
  return { users, userLoading, refetch };
}

export default useUsers