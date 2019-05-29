import React from 'react'
import contentEditable from '../../utils/contentEditable'

const GroupCard = props => {
  let Span = contentEditable('span')
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
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupCard
