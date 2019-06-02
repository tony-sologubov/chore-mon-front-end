import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import uuidv4 from 'uuid'
import FirebaseContext from '../../firebase/context'
import TaskCard from './TaskCard'

const GetTasks = ({ gid }) => {
  const { firebase } = useContext(FirebaseContext)
  const [tasks, setTasks] = useState([])
  const uid = JSON.parse(localStorage.getItem('user')).uid
  useEffect(() => {
    const unsubscribe = firebase.firestore
      .collection(`users/${uid}/groups/${gid}/tasks`)
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
  }, [firebase.firestore, uid, gid])

  return (
    <div>
      <Link to="/dashboard">Go Back</Link>
      <div>
        {tasks.map(task => (
          <TaskCard
            id={task.id}
            chore={task.chore}
            date={task.date}
            isDone={task.isDone}
            assigned={task.assigned}
            key={uuidv4()}
            gid={gid}
          />
        ))}
      </div>
    </div>
  )
}

export default GetTasks
