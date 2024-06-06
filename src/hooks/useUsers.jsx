import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useUsers = () => {
     const { loading } = useAuth();
     const axiosSecure = useAxiosSecure();

     const {
       data: users = [],
       isLoading,
       refetch,
     } = useQuery({
       queryKey: ["users"],
       enabled: !loading && !!localStorage.getItem("access-token"),
       queryFn: async () => {
         const { data } = await axiosSecure(`/users`);
         return data;
       },
     });
  return {users,isLoading,refetch}
}

export default useUsers