import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase/index'
import GroupCard from './GroupCard'
import uuidv4 from 'uuid'
import axios from 'axios'

// const groupUrl = "http://chore-monkey.herokuapp.com/api/group"
// const groupMembersUrl = "http://chore-monkey.herokuapp.com/api/groupmembers/"
const groupUrl = "http://localhost:9000/api/group/"
const groupMembersUrl = "http://localhost:9000/api/groupmembers/"



const GetGroups = ({groups}) => {

  if (groups[0]) {
    return groups.map(group => (
      <GroupCard key={uuidv4()} group={group} id={group.id} />
      ))
    } else {
      return <h1>Taskings showing up here soon :)</h1>
    }
}

export default GetGroups
