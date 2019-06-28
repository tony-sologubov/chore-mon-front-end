import React, { useState } from 'react'
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

  function ProfilePhotoTask({ user, onClick }) {
    const classes = useStyles()

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
        </span>
      </div>
      )
    } else {
      return ( <p></p> )
    }
  }

  export default ProfilePhotoTask