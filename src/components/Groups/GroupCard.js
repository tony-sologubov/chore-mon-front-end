import React, { useContext } from 'react'
import { FirebaseContext } from '../../firebase/index'

const GroupCard = props => {
  const { firebase } = useContext(FirebaseContext)
  return (
    <div className="group-card">
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Card Title</span>
              <p>
                {firebase.dbFS
                  .collection('groups')
                  .onSnapshot(snapshot => console.log(snapshot.data()))}
              </p>
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
