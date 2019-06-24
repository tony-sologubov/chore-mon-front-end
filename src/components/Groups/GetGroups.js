import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase/index'
import GroupCard from './GroupCard'
import uuidv4 from 'uuid'
import axios from 'axios'

// const url = "http://chore-monkey.herokuapp.com/api/group"
const url = "http://localhost:9000/api/group/"

// const GetGroups = () => {
//   const { firebase } = useContext(FirebaseContext)
//   const [groups, setGroups] = useState([])
//   const id = JSON.parse(localStorage.getItem('user')).uid
//   useEffect(() => {
//     const unsubscribe = firebase.firestore
//     .collection(`users/${id}/groups`)
//     .onSnapshot(snapshot =>
//       setGroups(
//         snapshot.docs.map(doc => {
//           return { id: doc.id, ...doc.data() }
//         })
//         )
//         )
//         return () => {
//           unsubscribe()
//         }
//       }, [firebase.firestore, id])
      
const GetGroups = () => {
  const [groups, setGroups] = useState([])
    useEffect(() => {
      axios
      .get(url)
      .then(response => {
        console.log(response.data)
        setGroups(response.data)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])
  // }

  console.log("Before Render - Groups:", groups)

  return groups.map(group => (
    <GroupCard key={uuidv4()} group={group} id={group.id} />
  ))
}

export default GetGroups
