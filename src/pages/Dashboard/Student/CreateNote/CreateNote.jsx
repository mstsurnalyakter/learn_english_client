import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const CreateNote = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure()
   const [data, setData] = useState({
     description: "",
     title:"",
   });

   const handleSubmit = async (e) =>{
    e.preventDefault();
    const noteInfo = {
      ...data,
      email: user?.email,
      date: new Date(),
    };

       try {
      const {data} = await axiosSecure.post("/note",noteInfo );
      if (data?.insertedId) {
        setData({
          description: "",
          title: "",
        });
        toast.success("Note Save Successfully.")
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
    }


   }

  return (
    <div className="shadow p-10 rounded mr-3 border-2 border-[#d8e5f5]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col w-full space-y-6">
          <div className="w-full flex gap-2 items-center">
            <label htmlFor="title">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user?.email}
              readOnly
              className="p-4 rounded-md border-2 dark:text-gray-800  dark:bg-gray-50 outline-none flex-grow"
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <label htmlFor="title">Note Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              required
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
              required
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
          <button className="px-3 py-2 bg-[#4D95EA] text-white" type="submit">
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote