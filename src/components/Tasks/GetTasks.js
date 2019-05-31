import React, { useContext, useState, useEffect } from 'react'
import FirebaseContext from '../../firebase/context'
import TaskCard from './TaskCard'

const GetTasks = ({ groupRoute }) => {
  const { firebase } = useContext(FirebaseContext)
  const [tasks, setTasks] = useState([])
  const id = JSON.parse(localStorage.getItem('user')).uid
  useEffect(() => {
    async function fetchTasks() {
      const unsubscribe = await firebase.dbFS
        .collection(`users/${id}/tasks`)
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
  }, [firebase.dbFS, id, groupRoute])

  console.log(tasks)
  return (
<div className="groupTableList">
  <table className="highlight"> 
    <thead>
          <tr>
            <th>Chore</th>
            <th>Assigned</th>
            <th>Date</th>
            <th>Done</th>
            <th>Actions</th>
          </tr>
    
  { tasks.map(task => (
    
            <TaskCard
              id={task.id}
              chore={task.chore}
              date={task.date}
              isDone={task.isDone}
              assigned={task.assigned}
            />
      ))}
  
    </thead>
  </table>
</div>
  )
} 
export default GetTasks
