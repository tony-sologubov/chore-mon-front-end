import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase/index'
import Group from './Group'
import uuidv4 from 'uuid'

const GetGroups = () => {
  const { firebase, user } = useContext(FirebaseContext)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    async function fetchGroups() {
      const snapshot = await firebase.dbFS
        .collection(`users/${user.uid}/groups`)
        .get()
      setGroups(
        snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
      )
    }
    fetchGroups()
  }, [])

  return groups.map(group => <Group groupName={group.groupName} />)
}

export default GetGroups
