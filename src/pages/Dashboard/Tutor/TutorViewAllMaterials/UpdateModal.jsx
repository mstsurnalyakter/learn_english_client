
import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import UpdateMaterForm from './UpdateMaterForm';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { imageUpload } from '../../../../api/utils';
import toast from 'react-hot-toast';


const UpdateModal = ({ setIsEditModalOpen, isOpen, material, refetch }) => {
   const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [materialData, setMaterialData] = useState(material);

  // handle image changes
  const handleImage = async (image) => {
    setLoading(true);
    try {
      const imageURL = await imageUpload(image);
      console.log(imageURL);
      setMaterialData({ ...materialData, imageURL });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedMaterialData = Object.assign({}, materialData);
    delete updatedMaterialData?._id;
    console.log(updatedMaterialData);
    try {
      const { data } = await axiosSecure.put(
        `/material/update/${material?._id}`,
        updatedMaterialData
      );
      console.log(data);
      refetch();
      setIsEditModalOpen(false);
      toast.success("Material info Update successfully.");
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
                  Update Material Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Update material form */}
                  <UpdateMaterForm
                    handleSubmit={handleSubmit}
                    materialData={materialData}
                    loading={loading}
                    setMaterialData={setMaterialData}
                    handleImage={handleImage}
                  />
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
}

UpdateModal.propTypes = {
  setIsEditModalOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  material: PropTypes.object,
  refetch: PropTypes.func,
};

export default UpdateModal