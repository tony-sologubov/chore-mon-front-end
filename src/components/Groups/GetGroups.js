import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase/index'
import Group from './Group'

const GetGroups = () => {
  const { firebase, user } = useContext(FirebaseContext)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    async function fetchGroups() {
      const unsubscribe = await firebase.dbFS
        .collection(`users/${user.uid}/groups`)
        .onSnapshot(snapshot =>
          setGroups(
            snapshot.docs.map(doc => {
              return { id: doc.id, ...doc.data() }
            })
          )
        )
      return () => unsubscribe()
    }
    fetchGroups()
  }, [firebase.dbFS, user.uid])

  return groups.map(group => <Group groupName={group.groupName} />)
}

export default GetGroups
