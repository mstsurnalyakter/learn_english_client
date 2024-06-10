import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const UpdateSessionForm = ({
  handleSubmit,
  sessionData,
  loading,
  startDate1,
  startDate2,
  startDate3,
  startDate4,
  setStartDate1,
  setStartDate2,
  setStartDate3,
  setStartDate4,
  setSessionData,
  handleImage,
}) => {
  return (
    <div className="w-full  flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-1 text-sm">
            <label htmlFor="sessionTitle" className="block text-gray-600">
              Session Title
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
              name="sessionTitle"
              id="sessionTitle"
              type="text"
              value={sessionData?.sessionTitle}
              onChange={(e) =>
                setSessionData({ ...sessionData, sessionTitle: e.target.value })
              }
              placeholder="Session Title"
              required
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="registrationFee" className="block text-gray-600">
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
                    onChange={(e) => handleImage(e.target.files[0])}
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
            <label htmlFor="sessionDuration" className="block text-gray-600">
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
            <label htmlFor="classStartDate" className="block text-gray-600">
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
            <label htmlFor="classEndDate" className="block text-gray-600">
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
            <label htmlFor="status" className="block text-gray-600">
              Status
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
              name="status"
              id="status"
              type="text"
              value={sessionData?.status}
              onChange={(e) =>
                setSessionData({ ...sessionData, status: e.target.value })
              }
              placeholder="Status"
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="sessionDescription" className="block text-gray-600">
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
  );
};

UpdateSessionForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleImage: PropTypes.func,
  setSessionData: PropTypes.func,
  sessionData: PropTypes.object,
  loading: PropTypes.bool,
};

export default UpdateSessionForm;
