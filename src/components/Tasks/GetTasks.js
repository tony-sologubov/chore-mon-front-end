import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import uuidv4 from 'uuid'
import FirebaseContext from '../../firebase/context'
import TaskCard from './TaskCard'

const GetTasks = ({ groupRoute }) => {
  const { firebase } = useContext(FirebaseContext)
  const [tasks, setTasks] = useState([])
  const id = JSON.parse(localStorage.getItem('user')).uid
  useEffect(() => {
    async function fetchTasks() {
      const unsubscribe = await firebase.firestore
        .collection(`users/${id}/groups/${groupRoute}/tasks`)
        .onSnapshot(snapshot =>
          setTasks(
            snapshot.docs.map(doc => {
              return { id: doc.id, ...doc.data() }
            })
          )
        )
      return () => unsubscribe()
    }
    fetchTasks()
  }, [firebase.firestore, id, groupRoute])

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
            groupRoute={groupRoute}
          />
        ))}
      </div>
    </div>
  )
}

export default GetTasks
