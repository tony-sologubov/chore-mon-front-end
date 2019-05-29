import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase/index'
import GroupCard from './GroupCard'

const RenderGroups = props => {
  const { firebase, user } = useContext(FirebaseContext)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const unsubscribe = async function getGroups() {
      const snapshot = await firebase.dbFS
        .collection(`users/${user.uid}/groupCards`)
        .get()

      snapshot.forEach(doc => {
        const id = doc.id
        const data = doc.data()
        console.log({ id, data })
      })
    }
    return () => unsubscribe()
  }, [firebase.dbFS, user.uid])
  return <GroupCard />
}

export default RenderGroups
