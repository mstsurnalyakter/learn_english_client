import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../../api/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateSessionModal = ({ setIsOpen, isOpen, session, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState(session);
   const [startDate1, setStartDate1] = useState(
     new Date(session?.registrationStartDate || new Date())
   );
   const [startDate2, setStartDate2] = useState(
     new Date(session?.registrationEndDate || new Date())
   );
   const [startDate3, setStartDate3] = useState(
     new Date(session?.classStartDate || new Date())
   );
   const [startDate4, setStartDate4] = useState(
     new Date(session?.classEndDate || new Date())
   );

  // handle image changes
  const handleImage = async (image) => {
    setLoading(true);
    try {
      const imageURL = await imageUpload(image);
      console.log(imageURL);
      setSessionData({ ...sessionData, imageURL });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedSessionData = Object.assign({}, sessionData);
    delete updatedSessionData?._id;
    updatedSessionData.registrationStartDate = startDate1;
      updatedSessionData.registrationEndDate = startDate2;
      updatedSessionData.classStartDate = startDate3;
      updatedSessionData.classEndDate = startDate4;

    try {
      const { data } = await axiosSecure.put(
        `/session/update/${session?._id}`,
        updatedSessionData
      );
      console.log(data);
      refetch();
      setIsOpen(false);
      toast.success("Session info Update successfully.");
      setLoading(false);
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
        onClose={() => setIsOpen(false)}
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
                  Update Session Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Update material form */}
                  <div className="w-full  flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
                    <form onSubmit={handleSubmit} className="w-full">
                      <div className="grid grid-cols-1 gap-10">
                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="sessionTitle"
                            className="block text-gray-600"
                          >
                            Session Title
                          </label>
                          <input
                            className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
                            name="sessionTitle"
                            id="sessionTitle"
                            type="text"
                            value={sessionData?.sessionTitle}
                            onChange={(e) =>
                              setSessionData({
                                ...sessionData,
                                sessionTitle: e.target.value,
                              })
                            }
                            placeholder="Session Title"
                            required
                          />
                        </div>
                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="registrationFee"
                            className="block text-gray-600"
                          >
                            Registration Fee
                          </label>
                          <input
                            className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
                            name="registrationFee"
                            id="registrationFee"
                            type="number"
                            value={sessionData?.registrationFee}
                            onChange={(e) =>
                              setSessionData({
                                ...sessionData,
                                registrationFee: e.target.value,
                              })
                            }
                            placeholder="Registration Fee"
                            required
                          />
                        </div>

                        <div className=" p-4 bg-white w-full  m-auto rounded-lg">
                          <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                            <div className="flex flex-col w-max mx-auto text-center">
                              <label>
                                <input
                                  className="text-sm cursor-pointer w-36 hidden"
                                  type="file"
                                  name="image"
                                  onChange={(e) =>
                                    handleImage(e.target.files[0])
                                  }
                                  id="image"
                                  accept="image/*"
                                  hidden
                                />
                                <div className="bg-[#4D95EA] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#4D95EA]">
                                  Upload Image
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="sessionDuration"
                            className="block text-gray-600"
                          >
                            Session Duration (hours {`<`} 2)
                          </label>
                          <input
                            className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
                            name="sessionDuration"
                            id="sessionDuration"
                            type="number"
                            value={sessionData?.sessionDuration}
                            onChange={(e) =>
                              setSessionData({
                                ...sessionData,
                                sessionDuration: e.target.value,
                              })
                            }
                            placeholder="Registration Fee"
                            required
                          />
                        </div>

                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="registrationStartDate"
                            className="block text-gray-600"
                          >
                            Registration Start Date
                          </label>
                          <DatePicker
                            required
                            selected={startDate1}
                            onChange={(date) => setStartDate1(date)}
                            className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
                          />
                        </div>

                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="registrationEndDate"
                            className="block text-gray-600"
                          >
                            Registration End Date
                          </label>
                          <DatePicker
                            required
                            selected={startDate2}
                            onChange={(date) => setStartDate2(date)}
                            className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
                          />
                        </div>

                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="classStartDate"
                            className="block text-gray-600"
                          >
                            Class Start Date
                          </label>
                          <DatePicker
                            required
                            selected={startDate3}
                            onChange={(date) => setStartDate3(date)}
                            className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
                          />
                        </div>
                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="classEndDate"
                            className="block text-gray-600"
                          >
                            Class End Date
                          </label>
                          <DatePicker
                            required
                            selected={startDate4}
                            onChange={(date) => setStartDate4(date)}
                            className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
                          />
                        </div>
                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="status"
                            className="block text-gray-600"
                          >
                            Status
                          </label>
                          <input
                            className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
                            name="status"
                            id="status"
                            type="text"
                            value={sessionData?.status}
                            onChange={(e) =>
                              setSessionData({
                                ...sessionData,
                                status: e.target.value,
                              })
                            }
                            placeholder="Status"
                            required
                          />
                        </div>

                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="sessionDescription"
                            className="block text-gray-600"
                          >
                            Session Description
                          </label>
                          <textarea
                            className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
                            name="sessionDescription"
                            id="sessionDuration"
                            type="number"
                            value={sessionData?.sessionDuration}
                            onChange={(e) =>
                              setSessionData({
                                ...sessionData,
                                sessionDuration: e.target.value,
                              })
                            }
                            placeholder="Session Description"
                            required
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#4D95EA]"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
                <hr className="mt-8 " />
                <div className="mt-2 ">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
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

UpdateSessionModal.propTypes = {
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  session: PropTypes.object,
  refetch: PropTypes.func,
};

export default UpdateSessionModal;
