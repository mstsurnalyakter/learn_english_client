import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const RejectionModal = ({
  setIsRejectionModal,
  isOpen,
  session,
  refetch,
  handleStatus,
}) => {
  const axiosSecure = useAxiosSecure();

   const [rejectionReason, setRejectionReason] = useState("");
   const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

     const rejectionData = {
       rejectionReason,
       feedback,
     };


    try {
      const { data } = await axiosSecure.put(
        `/study-session-rejection/${session?._id}`,
        rejectionData
      );


      handleStatus(session?._id, session?.status, "rejected");
      setIsRejectionModal(false);
      if (data?.modifiedCount > 0) {
        toast.success("Reject Session successfully.");
        refetch();
      }
    } catch (error) {
      console.error("Error approving session:", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsRejectionModal(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Reject Session
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Update session form */}
                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Rejection Reason
                      </label>
                      <textarea
                        className="mt-1 p-2 block w-full rounded-md border-2 border-[#bed5ef] shadow-sm outline-[#4D95EA]"
                        rows="3"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Feedback
                      </label>
                      <textarea
                        className="mt-1 p-2 block w-full rounded-md border-2 border-[#bed5ef] shadow-sm outline-[#4D95EA]"
                        rows="3"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        className="ml-4 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setIsRejectionModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

RejectionModal.propTypes = {
  setIsRejectionModal: PropTypes.func,
  isOpen: PropTypes.bool,
  session: PropTypes.object,
  refetch: PropTypes.func,
  handleStatus: PropTypes.func,
};

export default RejectionModal;
