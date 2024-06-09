import PropTypes from "prop-types";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const UpdateNoteForm = ({ note, refetch, setEdit }) => {
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
      date: new Date(),
    };

    try {
      const { data } = await axiosSecure.put(`/note/${note?._id}`, updateInfo);

      console.log(data);

      if (data?.modifiedCount > 0) {
        refetch();
        toast.success("Note info Update successfully.");
        setLoading(false);
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="border-2  p-5 border-gray-400 my-5 ">
      <div className="mt-2 w-full ">
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
      </div>
      <hr className="mt-8 " />
      <div className="mt-2 ">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          onClick={() => setEdit(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

UpdateNoteForm.propTypes = {
  note: PropTypes.object,
  refetch: PropTypes.func,
  setEdit:PropTypes.func
};

export default UpdateNoteForm;
