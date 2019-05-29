import React, { useContext, useEffect } from 'react'
import { FirebaseContext } from '../../firebase/index'
import GroupCard from './GroupCard'

const RenderGroups = props => {
  const { firebase, user } = useContext(FirebaseContext)

  useEffect(() => {
    firebase.dbFS
      .collection(`users/${user.uid}/groupCards`)
      .get()
      .then(snapshot => console.log(snapshot.data))
      .catch(e => console.error(e.message))
  }, [firebase.dbFS, user.uid])

  return <GroupCard />
}

export default RenderGroups
