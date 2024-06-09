import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useBookingSessions = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookingSessions = [], isLoading:bookingsSessionLoading ,refetch:bookingRefetch} = useQuery({
      queryKey: ["bookingSession", user?.email],
      enabled:
        (!loading && !!user?.email) || !!localStorage.getItem("access-token"),
      queryFn: async () => {
        const { data } = await axiosSecure(`/bookingSession/${user?.email}`);
        return data;
      },
    });

  return {bookingSessions,bookingsSessionLoading,bookingRefetch}
}

export default useBookingSessions