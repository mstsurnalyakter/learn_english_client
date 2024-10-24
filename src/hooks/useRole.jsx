import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  //   Fetch user info using logged in user email
  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled:
      (!loading && !!user?.email) || !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data.role;
    },
  });

  return {role, isLoading}
};

export default useRole;
