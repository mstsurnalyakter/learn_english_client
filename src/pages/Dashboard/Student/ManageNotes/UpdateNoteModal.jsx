/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const UpdateNoteModal = ({ setIsEditModalOpen, isOpen, note, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
      description: note?.description,
      title: note?.title,
    });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updateInfo = {
        ...data,
        date: new Date()
    }

    try {
      const { data } = await axiosSecure.put(
        `/note/${note?._id}`,
        updateInfo
      );

      if (data?.modifiedCount > 0) {
        refetch();
        setIsEditModalOpen(false);
        toast.success("Note info Update successfully.");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
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
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Note Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Update note form */}
                  <div className="">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex flex-col w-full space-y-6">
                        <div className="w-full flex gap-2 items-center">
                          <label htmlFor="title">Note Title:</label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            value={data?.title}
                            onChange={(event) =>
                              setData((prevData) => ({
                                ...prevData,
                                title: event.target.value,
                              }))
                            }
                            placeholder="Note Title"
                            className="p-4 rounded-md border-2 outline-[#a7cbf4] dark:text-gray-800 dark:bg-gray-50 border-[#a7cbf4] flex-grow"
                          />
                        </div>
                        <div className="w-full flex gap-2 items-center">
                          <label htmlFor="title">Note Description:</label>
                          <textarea
                            id="description"
                            value={data?.description}
                            onChange={(event) =>
                              setData((prevData) => ({
                                ...prevData,
                                description: event.target.value,
                              }))
                            }
                            rows="5"
                            placeholder="Write Something Awesome...."
                            className="p-4 rounded-md border-2 border-[#a7cbf4] outline-[#a7cbf4] dark:text-gray-800 dark:bg-gray-50 flex-grow"
                          ></textarea>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          className="px-3 py-2 bg-[#4D95EA] text-white"
                          type="submit"
                        >
                          {loading ? (
                            <TbFidgetSpinner className="animate-spin m-auto" />
                          ) : (
                            "Update Note"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* Update note form */}
                </div>
                <hr className="mt-8 " />
                <div className="mt-2 ">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

UpdateNoteModal.propTypes = {
  setIsEditModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UpdateNoteModal;
