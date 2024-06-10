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


const UpdateModal = ({
  setIsEditModalOpen,
  isOpen,
  session,
  refetch,
  handleStatus,
}) => {
  const axiosSecure = useAxiosSecure();


  const [isPaid, setIsPaid] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosSecure.patch(
        `/study-session-registrationFee/${session?._id}`,
        {
          registrationFee: isPaid ? parseFloat(amount) : 0,
        }
      );
      handleStatus(session?._id, session?.status, "approved");
      if (data?.modifiedCount > 0) {
         toast.success("Registration Fee updated successfully.");
         refetch();
         setIsEditModalOpen(false);
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
        onClose={() => setIsEditModalOpen(false)}
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
                  Session Approved
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Update session form */}
                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Is the session free or paid?
                      </label>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="free"
                            name="paymentStatus"
                            type="radio"
                            value="free"
                            checked={!isPaid}
                            onChange={() => setIsPaid(false)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="free"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Free
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="paid"
                            name="paymentStatus"
                            type="radio"
                            value="paid"
                            checked={isPaid}
                            onChange={() => setIsPaid(true)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="paid"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Paid
                          </label>
                        </div>
                      </div>
                    </div>
                    {isPaid && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Registration Fee
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          min="0"
                        />
                      </div>
                    )}
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="ml-4 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setIsEditModalOpen(false)}
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

UpdateModal.propTypes = {
  setIsEditModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  session: PropTypes.object,
  refetch: PropTypes.func,
  handleStatus: PropTypes.func,
};

export default UpdateModal;
