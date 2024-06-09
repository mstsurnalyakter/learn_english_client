
import PropTypes from 'prop-types'

const UpdateMaterForm = ({handleSubmit, materialData, loading, setMaterialData ,handleImage}) => {
  return (
    <div className="w-full  flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-1 text-sm">
            <label htmlFor="title" className="block text-gray-600">
              Title
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
              name="title"
              id="title"
              type="text"
              value={materialData?.title}
              onChange={(e) =>
                setMaterialData({ ...materialData, title: e.target.value })
              }
              placeholder="Title"
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
            <label htmlFor="link" className="block text-gray-600">
              Google Drive Link
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-[#4D95EA] focus:outline-[#4D95EA] rounded-md "
              name="link"
              id="link"
              type="url"
              value={materialData?.link}
              onChange={(e) =>
                setMaterialData({ ...materialData, link: e.target.value })
              }
              placeholder="Google Drive Link"
              required
            />
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
}

UpdateMaterForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleImage: PropTypes.func,
  setMaterialData: PropTypes.func,
  materialData: PropTypes.object,
  loading: PropTypes.bool,
};

export default UpdateMaterForm