import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
// import { imageUpload } from "../../../../api/utils";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import DynamicTitle from "../../../../components/Shared/DynamicTitle/DynamicTitle";
import { FaUpload } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { imageUpload } from "../../../../api/utils";

const UploadMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { user, loading:userLoading } = useAuth();

      const {
        register,
        handleSubmit,
         reset,
        formState: { errors },
      } = useForm();

    const {
      data: approvedSessions = [],
      isLoading:approvedSessionsLoading,
      refetch:approvedSessionsRefetch,
    } = useQuery({
      queryKey: ["approvedSessions", user?.email],
      enabled:
        (!userLoading && !!user?.email) ||
        !!localStorage.getItem("access-token"),
      queryFn: async () => {
        const { data } = await axiosSecure(`/sessions/approved/${user?.email}`);
        return data;
      },
    });


    const sessionIDArr = approvedSessions?.map(
      (session) => session?._id
    );


   const onSubmit = async (data) => {
    const { title, image, link, sessionID } = data || {};


     setLoading(true);
     const imageURL = await imageUpload(image[0]);

      const materialInfo = {
        title,
        imageURL,
        link,
        sessionID,
        email: user?.email,
      };

     try {
       const { data } = await axiosSecure.post(
         "/upload-material",
         materialInfo
       );
       console.log(data);
       if (data?.insertedId) {
         setLoading(false);
         toast.success("Upload Materials Successfully.");
          reset();
       }
     } catch (error) {
       toast.error(error.message);
       setLoading(false);
     }
   };

  return (
    <>
      <DynamicTitle pageTitle="Upload Materials" />
      <div className="shadow-lg border-2 p-5  text-gray-800 font-medium">
        {/* Heading */}
        <div className="mt-5 mb-8">
          <p className="flex items-center justify-center text-3xl font-bold ">
            <span className="mr-3">
              <FaUpload />
            </span>
            <span className="">Upload Materials</span>
          </p>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-8 ">
            <div className="flex-1 space-y-3">
              <div>
                <label className="block mb-2 " htmlFor="title">
                  Title
                </label>
                <input
                  className="w-full p-2 border-2 rounded-md focus:outline-[#4D95EA]"
                  type="text"
                  placeholder="Title"
                  id="title"
                  name="title"
                  {...register("title", { required: true })}
                />
              </div>

              <div>
                <label className="block mb-2 " htmlFor="name">
                  Tutor Email
                </label>
                <input
                  className="w-full p-2 border-2 rounded-md focus:outline-[#4D95EA]"
                  type="text"
                  name="email"
                  defaultValue={user?.email}
                  id="email"
                  disabled
                  placeholder="Email"
                />
              </div>

              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="image"
                >
                  Image Upload
                </label>
                <input
                  id="image"
                  autoComplete="image"
                  name="image"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-700 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-700"
                  type="file"
                  placeholder="Image Upload"
                  {...register("image", { required: true })}
                />
              </div>

              <div className="mt-4">
                <select
                  name="sessionID"
                  id="sessionID"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  placeholder="Select Study session ID "
                  {...register("sessionID", { required: true })}
                >
                  <option value="">Select Study session ID</option>
                  {sessionIDArr?.length > 0 &&
                    sessionIDArr?.map((id) => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 " htmlFor="link">
                  Google Drive Link
                </label>
                <input
                  className="w-full p-2 border-2 rounded-md focus:outline-[#4D95EA]"
                  type="url"
                  placeholder="link"
                  id="link"
                  name="link"
                  {...register("link", { required: true })}
                />
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="px-4 w-full py-2 mt-4 cursor-pointer rounded  bg-[#4D95EA] text-white"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              " Upload Material"
            )}
          </button>
        </form>
      </div>
    </>
  );




};

export default UploadMaterials;
