import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase/index'
import GroupCard from './GroupCard'
import uuidv4 from 'uuid'
import axios from 'axios'

// const groupUrl = "http://chore-monkey.herokuapp.com/api/group"
// const groupMembersUrl = "http://chore-monkey.herokuapp.com/api/groupmembers/"
const groupUrl = "http://localhost:9000/api/group/"
const groupMembersUrl = "http://localhost:9000/api/groupmembers/"



const GetGroups = () => {
  const [groups, setGroups] = useState([])
  const [groupMembers, setGroupMembers] = useState([])

// Get a list of all the group members a user belongs to
// Currently hardcoded. Link dynamically once we fix seeds/switch to heroku
  useEffect(() => {
    const fetchGroupMembers = async () => {
      const groupMemberz = await axios
      .get(`${groupMembersUrl}/user/4`)

      setGroupMembers(groupMemberz.data)
    }
    fetchGroupMembers();
  }, [])

// Set all groups a user belongs to 'groups' so React can render them
    useEffect(() => {
      const fetchData = async () => {

        try {
          //store all the urls for the axios calls in one variable
          var promises = groupMembers.data.map(group =>
            `${groupUrl}/${group.groupId}` )
          //store all axios calls in a variable
          let allPromises = promises.map(url =>
            axios.get(url).then(response => response.data))
          //call and wait until _all_ calls are synced, then store
          let response = await Promise.all(allPromises)
          //set groups only once
          setGroups(response)

        } catch (error) {
          console.log(error)
        }
      }
    fetchData();
  }, [groupMembers])

  if (groups[0]) {
    return groups.map(group => (
      <GroupCard key={uuidv4()} group={group.data[0]} id={group.id} />
      ))
    } else {
      return <h1>Taskings showing up here soon :)</h1>
    }
}

export default GetGroups
