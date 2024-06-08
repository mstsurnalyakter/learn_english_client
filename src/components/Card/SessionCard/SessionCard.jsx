import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const SessionCard = ({session}) => {


  const checkStartDate = new Date(session?.registrationStartDate) <= new Date();
  const checkEndDate = new Date(session?.registrationEndDate) >= new Date();

  return (
    <div>
      <div className="w-full rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 border-2 p-3">
        <img
          src={session?.imageURL}
          alt=""
          className="object-cover object-center w-full rounded-t-md  dark:bg-gray-500"
        />
        <div className="flex flex-col justify-between p-6 space-y-8">
          <div className="space-y-2 flex-grow">
            <h2 className="text-lg font-medium">{session?.sessionTitle}</h2>
            <p
              title={session?.sessionDescription}
              className="dark:text-gray-800 text-sm"
            >
              {session?.sessionDescription.slice(0, 150)}....
            </p>
          </div>
          <div>
            {checkStartDate && checkEndDate ? (
              <button className="px-3 py-2 bg-green-100 text-green-900 rounded">
                ongoing
              </button>
            ) : (
              <button className="px-3 py-2 bg-red-100 text-red-900 rounded">
                closed
              </button>
            )}
          </div>
          <Link to={`/sessionDetail/${session?._id}`}>
            <button
              type="button"
              className="flex items-center bg-[#4D95EA] text-white hover:bg-[#358ef4]  justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

SessionCard.propTypes = {
  session:PropTypes.object
}

export default SessionCard