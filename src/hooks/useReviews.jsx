import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useReviews = (id) => {
     const axiosSecure = useAxiosSecure();
    const {
      data: reviews = [],
      isLoading: reviewLoading,
      refetch: reviewRefetch,
    } = useQuery({
      queryKey: ["reviews"],
      queryFn: async () => {
        const { data } = await axiosSecure(`/reviews/${id}`);
        return data;
      },
    });
    return {reviews,reviewLoading,reviewRefetch}
}

export default useReviews