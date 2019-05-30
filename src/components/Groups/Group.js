import React from 'react'
import { Link } from 'react-router-dom'
import contentEditable from '../../utils/contentEditable'

const Group = props => {
  let Span = contentEditable('span')
  const groupSpaceRemoved = props.groupName.split(' ').join('')
  return (
    <div className="group-card">
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                <Span value={props.groupName} />
              </span>
            </div>
            <div className="card-action">
              <Link to={`group/${groupSpaceRemoved}`}>This is a link</Link>
              <Link to="/linkB">This is a link</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Group
