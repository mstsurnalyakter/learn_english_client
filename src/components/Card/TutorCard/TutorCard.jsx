
import PropTypes from 'prop-types'
import { PiCertificateFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { useCallback } from 'react';

const TutorCard = ({ user }) => {
  const email = user?.email || '';

  const handleContact = useCallback(() => {
    if (!email) return;
    // copy to clipboard
    try {
      navigator.clipboard.writeText(email);
    } catch (e) {
      // ignore - fallback will still open mail client
    }
    // open mail client
    window.location.href = `mailto:${email}`;
  }, [email]);

  return (
    <article className="bg-gray-100 dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition p-6 flex flex-col items-center text-center">
      <img
        src={user?.imageURL}
        alt={user?.name || 'Tutor'}
        className="w-28 h-28 rounded-full object-cover ring-2 ring-white shadow-sm"
      />

      <div className="mt-4 w-full">
        <h3 className="text-lg font-semibold text-gray-900 ">{user?.name}</h3>
        {user?.title && <p className="text-sm text-gray-500">{user?.title}</p>}

        <p className="mt-3 text-sm text-gray-600 flex items-center justify-center gap-2">
          <MdEmail className="text-base" />
          <span className="truncate max-w-[180px]">{email}</span>
        </p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            <PiCertificateFill />
            Certified
          </span>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <button onClick={handleContact} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Contact</button>
        </div>
      </div>
    </article>
  );
};

TutorCard.propTypes = {
  user:PropTypes.object
}

export default TutorCard