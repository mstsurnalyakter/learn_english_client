import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";


const useReviews = (id) => {
     const axiosCommon = useAxiosCommon();
    const {
      data: reviews = [],
      isLoading: reviewLoading,
      refetch: reviewRefetch,
    } = useQuery({
      queryKey: ["reviews"],
      queryFn: async () => {
        const { data } = await axiosCommon(`/reviews/${id}`);
        return data;
      },
    });
    return {reviews,reviewLoading,reviewRefetch}
}

export default useReviews