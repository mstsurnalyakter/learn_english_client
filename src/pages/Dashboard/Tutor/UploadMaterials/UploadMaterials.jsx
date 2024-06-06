import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import { imageUpload } from "../../../../api/utils";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import DynamicTitle from "../../../../components/Shared/DynamicTitle/DynamicTitle";
import { FaUpload } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";

const UploadMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


   const onSubmit = async (data) => {
     const { bannerImage, sessionTitle, sessionDuration, sessionDescription } =
       data;
    //  const registrationStartDate = startDate1;
    //  const registrationEndDate = startDate2;
    //  const classStartDate = startDate3;
    //  const classEndDate = startDate4;

     setLoading(true);
     const imageURL = await imageUpload(bannerImage[0]);
     console.log(imageURL);

     const sessionInfo = {
       imageURL,
       sessionTitle,
       registrationFee: 0,
       registrationStartDate,
       registrationEndDate,
       classStartDate,
       classEndDate,
       sessionDescription,
       sessionDuration,
       status: "pending",
       students: 0,
       user: {
         email: user?.email,
         name: user?.displayName,
       },
     };

     try {
       const { data } = await axiosSecure.post(
         "/create-study-session",
         sessionInfo
       );
       if (data?.insertedId) {
         setLoading(false);
         toast.success("Study Session created Successfully.");
       }
     } catch (error) {
       toast.error(error.message);
       setLoading(false);
     }
   };


  return (
    <div className=" border border-[#4D95EA]">
      <DynamicTitle pageTitle="Upload Materials" />
      <div className="shadow-lg  p-5  bg-[#4D95EA] text-gray-800 font-medium">
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
                <label className="block mb-2 " htmlFor="bannerImage">
                  Banner Image
                </label>
                <input
                  className="w-full p-2 border-2 rounded-md focus:outline-[#4D95EA]"
                  type="file"
                  name="bannerImage"
                  id="bannerImage"
                  placeholder="Banner Image"
                  {...register("bannerImage", { required: true })}
                />
              </div>

              <div>
                <label className="block mb-2 " htmlFor="sessionTitle">
                  Session Title
                </label>
                <input
                  className="w-full p-2 border-2 rounded-md focus:outline-[#4D95EA]"
                  type="text"
                  placeholder="Session Title"
                  id="sessionTitle"
                  name="sessionTitle"
                  {...register("sessionTitle", { required: true })}
                />
              </div>

              {/* <div className="flex flex-col">
                <label className="mb-2">Registration Start Date</label>
                <DatePicker
                  required
                  selected={startDate1}
                  onChange={(date) => setStartDate1(date)}
                  className="p-2 border-2 rounded-md focus:outline-[#4D95EA]  w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Class Start date</label>
                <DatePicker
                  required
                  selected={startDate3}
                  onChange={(date) => setStartDate3(date)}
                  className="p-2 border-2 rounded-md focus:outline-[#4D95EA]  w-full"
                />
              </div> */}

              <div>
                <label className="block mb-2 " htmlFor="registrationFee">
                  Registration Fee
                </label>
                <input
                  className="w-full p-2 placeholder:text-gray-800  border-2 rounded-md focus:outline-[#4D95EA]"
                  disabled
                  type="number"
                  placeholder="0"
                  id="registrationFee"
                  name="registrationFee"
                />
              </div>

              <div>
                <label className="block mb-2 " htmlFor="status">
                  Status
                </label>
                <input
                  className="w-full p-2 border-2 placeholder:text-gray-800 rounded-md focus:outline-[#4D95EA]"
                  type="text"
                  placeholder="Pending"
                  id="status"
                  name="status"
                  disabled
                />
              </div>
            </div>
            {/* Right side */}
            <div className="flex-1 space-y-4 mb-4">
              <div>
                <label className="block mb-2 " htmlFor="name">
                  Tutor Name
                </label>
                <input
                  className="w-full p-2 border-2 rounded-md focus:outline-[#4D95EA]"
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  id="name"
                  disabled
                  placeholder="Name"
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

              {/* <div className="flex flex-col">
                <label className="mb-2">Registration End Date</label>
                <DatePicker
                  required
                  selected={startDate2}
                  onChange={(date) => setStartDate2(date)}
                  className="p-2 border-2 rounded-md focus:outline-[#4D95EA]  w-full"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Class End Date</label>
                <DatePicker
                  required
                  selected={startDate4}
                  onChange={(date) => setStartDate4(date)}
                  className="p-2 border-2 rounded-md focus:outline-[#4D95EA]  w-full"
                />
              </div> */}
              <div>
                <label className="block mb-2 " htmlFor="sessionDuration">
                  Session Duration (hours {`<`} 2)
                </label>
                <input
                  className="w-full p-2 border-2 rounded-md focus:outline-[#4D95EA]"
                  type="number"
                  min={3}
                  placeholder="Session Duration (hours < 2)"
                  id="sessionDuration"
                  name="sessionDuration"
                  {...register("sessionDuration", { required: true })}
                />
              </div>

              <div>
                <label className="block mb-2 " htmlFor="students">
                  Students
                </label>
                <input
                  className="w-full p-2 placeholder:text-gray-800  border-2 rounded-md focus:outline-[#4D95EA]"
                  disabled
                  type="number"
                  placeholder="0"
                  id="students"
                  name="students"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2 " htmlFor="sessionDescription">
              Session Description
            </label>

            <textarea
              {...register("sessionDescription", { required: true })}
              id="sessionDescription"
              name="sessionDescription"
              placeholder="Enter Session Description"
              className="textarea textarea-bordered border-2 p-2 rounded-md w-full focus:outline-[#4D95EA]"
            ></textarea>
          </div>

          {/* <input
             className="px-4 w-full py-2 mt-4 cursor-pointer rounded  bg-[#E3B342]"
             type="submit"
             value="Create Study Session"
           /> */}
          <button
            disabled={loading}
            type="submit"
            className="px-4 w-full py-2 mt-4 cursor-pointer rounded  bg-[#E3B342]"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Save & Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMaterials;
