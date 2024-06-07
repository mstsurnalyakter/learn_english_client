
import PropTypes from 'prop-types'

const ReviewSection = ({review}) => {
  return (
    <div className="grid col-span-1  md:grid-cols-12 border-b-2 pb-5">
      <div className="md:col-span-1 col-span-1">
        <img
          alt=""
          className="w-12 h-12 mb-3 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
          src={review?.studentPhoto}
        />
      </div>
      <div className="md:col-span-9 col-span-1">
        <h3>{review?.studentName}</h3>
        <p>{review?.studentEmail}</p>
        <p>{review?.review}</p>
      </div>
    </div>
  );
}

ReviewSection.propTypes = {
  review:PropTypes.object
};

export default ReviewSection