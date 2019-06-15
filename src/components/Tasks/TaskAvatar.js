import React, { useState } from 'react'
// import React, { useContext, useState } from 'react'
// import FirebaseContext from '../../firebase/context'
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
    avatar: {
      margin: 10
    },
    bigAvatar: {
      margin: '2rem',
      width: '10vw',
      height: '10vw'
    }
  })
  
  function ProfilePhotoTask({ assigned , user, groupId}) {
    const classes = useStyles()
    const [editedAssigned, setEditedAssigned] = useState(assigned)  
    // const id = JSON.parse(localStorage.getItem('user')).uid
  
    return (
      <div className="avatar-and-name">
        <Avatar
          alt="photo of user"
          src={JSON.parse(localStorage.getItem('user')).photoURL}
          className={classes.Avatar}
        />
          <span className="user-name">
           {JSON.parse(localStorage.getItem('user')).displayName.match(/[^\s,.'"!?]+/)[0]}
             {/* <input
              type="text"
              placeholder={assigned}
              value={editedAssigned}
              onChange={e => setEditedAssigned(e.target.value)}
            /> */}
            
        </span>
      </div>
    )
  }
  
  export default ProfilePhotoTask
//   <input
//   type="text"
//   name="assigned"
//   placeholder="Assign a Person"
//   value={values.assigned}
//   onChange={event => handleChange(event)}
// />

//   <input
//   type="text"
//   placeholder={assigned}
//   value={editedAssigned}
//   onChange={e => setEditedAssigned(e.target.value)}
// />

// const  TaskModal = ({ assigned }) => {
//   const [editedAssigned, setEditedAssigned] = useState(assigned)
