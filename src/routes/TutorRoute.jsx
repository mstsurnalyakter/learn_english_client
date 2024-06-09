import PropTypes from 'prop-types'
import useRole from '../hooks/useRole';
import { Navigate } from "react-router-dom";
import LoadingSpinner from '../components/Shared/LoadingSpinner/LoadingSpinner';

const TutorRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "tutor") return children;

  return <Navigate to="/dashboard" />;
};

TutorRoute.propTypes = {
  children: PropTypes.element,
};

export default TutorRoute