import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: '2rem',
    width: '10vw',
    height: '10vw'
  }
});

function DashPhoto() {
  const classes = useStyles();

  return (
    <Avatar
      alt="photo of user"
      src={
        JSON.parse(localStorage.getItem('firebaseui::rememberedAccounts'))[0].photoUrl ||
        'https://res.cloudinary.com/ryanboris/image/upload/v1561535196/profileplaceholder.png'
      }
      className={classes.bigAvatar}
    />
  );
}

export default DashPhoto;
