import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
// import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: '2rem',
    width: '15vw',
    height: '15vw'
  }
})

function DashPhoto() {
  const classes = useStyles()

  return (
    <Avatar
      alt="photo of user"
      src={JSON.parse(localStorage.getItem('user')).photoURL}
      className={classes.bigAvatar}
    />
  )
}

export default DashPhoto
