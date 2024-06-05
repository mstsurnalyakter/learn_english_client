
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useStudySession = () => {
      const { user, loading } = useAuth();
      const axiosSecure = useAxiosSecure();
   const {
     data: studySession = [],
     isLoading,
     refetch,
   } = useQuery({
     queryKey: ["studySession", user?.email],
     enabled:!loading && !!user?.email && !!localStorage.getItem("access-token"),
     queryFn: async () => {
       const { data } = await axiosSecure(`/study-session/${user?.email}`);
       return data;
     },
   });

   return {studySession,isLoading,refetch}
}

export default useStudySession