import React from 'react'
import { Link } from 'react-router-dom'
import contentEditable from '../../utils/contentEditable'

const Group = props => {
  let Span = contentEditable('span')
  const groupSpaceRemoved = props.groupName.split(' ').join('')
  return (
    <Link to={`group/${groupSpaceRemoved}`}>
      <div className="group-card">
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">
                  <Span value={props.groupName} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Group
