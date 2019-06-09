import React, { useContext, useState, useEffect, Fragment } from 'react'
import uuidv4 from 'uuid'
import FirebaseContext from '../../firebase/context'
import TaskCard from './TaskCard'
import GetComments from '../Comments/GetComments'
import AddComment from '../Comments/AddComment'

const GetTasks = ({ groupId }) => {
  const { firebase } = useContext(FirebaseContext)
  const [tasks, setTasks] = useState([])
  const uid = JSON.parse(localStorage.getItem('user')).uid
  useEffect(() => {
    const unsubscribe = firebase.firestore
      .collection(`users/${uid}/groups/${groupId}/tasks`)
      .onSnapshot(snapshot =>
        setTasks(
          snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
          })
        )
      )
    return () => {
      unsubscribe()
    }
  }, [firebase.firestore, uid, groupId])

  return (
    <div>
      {tasks.map(task => (
        <Fragment key={uuidv4()}>
          <TaskCard
            taskId={task.id}
            chore={task.chore}
            date={task.date}
            isDone={task.isDone}
            assigned={task.assigned}
            groupId={groupId}
          />
          <div>
            <AddComment taskId={task.id} groupId={groupId} />
            <GetComments taskId={task.id} groupId={groupId} />
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default GetTasks
