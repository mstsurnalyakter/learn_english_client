
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllStudySession = () => {
     const axiosSecure = useAxiosSecure();
       const {
         data: studySessions = [],
         isLoading,
         refetch,
       } = useQuery({
         queryKey: ["studySessions"],
         enabled: !!localStorage.getItem("access-token"),
         queryFn: async () => {
           const { data } = await axiosSecure(`/study-sessions`);
           return data;
         },
       });

       return {studySessions,isLoading,refetch}
}

export default useAllStudySession