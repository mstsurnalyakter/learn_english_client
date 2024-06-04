
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';


const List = ({ label, address, icon: Icon }) => {
  return (
    <li className="rounded-sm">
      <NavLink
        to={address}
        end
        className={({ isActive }) =>
          `flex items-center p-2 space-x-3 font-bold text-gray-900 rounded-md ${
            isActive ? "rounded-sm bg-gray-100" : ""
          }`
        }
      >
        <Icon />
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

List.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.elementType,
};

export default List