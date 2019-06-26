import React, { useContext, useState, useEffect, Fragment } from 'react'
import FirebaseContext from '../../firebase/context'
import GetTasksForUser from './GetTasksForUser'


const GetTasksByUser = ({ groupId }) => {

    const { firebase } = useContext(FirebaseContext)
    const [groups, setGroups] = useState([])
    const id = JSON.parse(localStorage.getItem('user')).uid
    useEffect(() => {
      const unsubscribe = firebase.firestore
        .collection(`users/${id}/groups`)
        .onSnapshot(snapshot =>
          setGroups(
            snapshot.docs.map(doc => {
              return { id: doc.id, ...doc.data() }
            })
          )
        )
    }, [firebase.firestore, id])

    return (
      <div>
          <div className="groupTableList">
              <table className="highlight"> 
                  <thead>
                      <tr>
                          <th className='boldTable'>Done</th>
                          <th className='boldTable'>Chore</th>
                          <th className='boldTable'>Assigned</th>
                          <th className='boldTable'>Date</th>
                          <th className='boldTable'>Actions</th>
                      </tr>
                  </thead>
              </table>
          </div>
      {   groups.map(group => (
        <GetTasksForUser groupId={group.groupId} groupName={group.groupName} />
      ))}
      </div>
    )
}

export default GetTasksByUser
