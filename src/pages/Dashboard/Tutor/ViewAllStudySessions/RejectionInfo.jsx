
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

const RejectionInfo = () => {
    const {id} = useParams();
  return (
    <div>RejectionInfo</div>
  )
}

RejectionInfo.propTypes = {}

export default RejectionInfo