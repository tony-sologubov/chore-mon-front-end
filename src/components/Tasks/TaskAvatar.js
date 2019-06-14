import React from "react";
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
  
  function ProfilePhotoTask() {
    const classes = useStyles()
  
    return (
      <Avatar
        alt="photo of user"
        src={JSON.parse(localStorage.getItem('user')).photoURL}
        className={classes.Avatar}
      />
    )
  }
  
  export default ProfilePhotoTask