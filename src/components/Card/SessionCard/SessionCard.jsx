import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const SessionCard = ({session}) => {


  const checkStartDate = new Date(session?.registrationStartDate) <= new Date();
  const checkEndDate = new Date(session?.registrationEndDate) >= new Date();

  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition">
      <div className="relative">
        <img
          src={session?.imageURL}
          alt={session?.sessionTitle || 'Session image'}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${checkStartDate && checkEndDate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {checkStartDate && checkEndDate ? 'Ongoing' : 'Closed'}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session?.sessionTitle}</h3>
        <p className="text-sm text-gray-600 line-clamp-3" title={session?.sessionDescription}>{session?.sessionDescription}</p>

        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="text-sm text-gray-500">Seats: <span className="font-medium text-gray-800 dark:text-gray-200">{session?.seats || '—'}</span></div>
          <Link to={`/sessionDetail/${session?._id}`} className="ml-auto">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">View Details</button>
          </Link>
        </div>
      </div>
    </article>
  );
}

SessionCard.propTypes = {
  session:PropTypes.object
}

export default SessionCard