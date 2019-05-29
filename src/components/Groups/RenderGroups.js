import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase/index'
import GroupCard from './GroupCard'
import uuidv4 from 'uuid'

const RenderGroups = () => {
  const { firebase, user } = useContext(FirebaseContext)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    async function getGroups() {
      const snapshot = await firebase.dbFS
        .collection(`users/${user.uid}/groups`)
        .get()
      setGroups(
        snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
      )
    }
    getGroups()
  }, [])

  return groups.map(group => <GroupCard groupName={group.groupName} />)
}

export default RenderGroups
