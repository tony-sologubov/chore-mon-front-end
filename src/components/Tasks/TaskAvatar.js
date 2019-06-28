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
  
  function ProfilePhotoTask({ assigned , user, onClick}) {
    const classes = useStyles()


    // console.log("username:", user[0].name)
    console.log(user)
    // console.log(user[0].profilePicture)

    if (user) {

      return (
        <div className="avatar-and-name" onClick={onClick}>
        <Avatar
          alt="photo of user"
          src={user.profilePcture}
          className={classes.Avatar}
          />
          <span className="user-name">
           {user.name.match(/[^\s,.'"!?]+/)[0]}
             {/* <input
              type="text"
              placeholder={assigned}
              value={editedAssigned}
              onChange={e => setEditedAssigned(e.target.value)}
            /> */}
            
        </span>
      </div>
    )
  } else {
    return ( <p></p> )
  }
  }
  
  export default ProfilePhotoTask