

import { useParams } from 'react-router'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../../components/Shared/LoadingSpinner/LoadingSpinner';

const RejectionInfo = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();

      const {
        data = {},
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["rejectSession", id],
        enabled: !!id && !!localStorage.getItem("access-token"),
        queryFn: async () => {
          const { data } = await axiosSecure(`rejectSession/${id}`);
          return data;
        },
      });

     if (isLoading) return <LoadingSpinner />;

  return (
    <div className='flex items-center justify-center min-h-[500px]'>
      {data?.rejectionReason && data?.feedback ? (
        <div className="shadow border-2 p-6 w-4/5 mx-auto space-y-5">
          <h3>
            <b className="text-red-500">Rejection Reason:</b>{" "}
            {data?.rejectionReason}
          </h3>
          <p>
            <b className="text-red-500">Feedback:</b> {data?.feedback}
          </p>
        </div>
      ) : (
        <h2>No rejection info available for this session</h2>
      )}
    </div>
  );
}

RejectionInfo.propTypes = {}

export default RejectionInfo