import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import contentEditable from '../../utils/contentEditable'
import FirebaseContext from '../../firebase/context'

const Group = ({ groupName }) => {
  let Span = contentEditable('span')
  const group = groupName.split(' ').join('')
  const { firebase, user } = useContext(FirebaseContext)

  async function deleteGroup() {
    await firebase.dbFS
      .collection(`users/${user.uid}/groups`)
      .doc(`${group}`)
      .delete()
  }

  return (
    <div className="group-card">
      <Link to={`group/${group}`}>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">
                  <Span value={groupName} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <button onClick={deleteGroup}>DELETE</button>
    </div>
  )
}

export default Group
