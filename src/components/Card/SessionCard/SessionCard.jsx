import PropTypes from 'prop-types'
import session1 from '../../../assets/session1.png'

const SessionCard = () => {
  return (
    <div>
      <div className="w-full rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 border-2 p-3">
        <img
          src={session1}
          alt=""
          className="object-cover object-center w-full rounded-t-md  dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-wide">
              Donec lectus leo
            </h2>
            <p className="dark:text-gray-800">
              Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center bg-[#4D95EA] text-white hover:bg-[#358ef4]  justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

SessionCard.propTypes = {}

export default SessionCard