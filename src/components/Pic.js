import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
// import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  avatar: {
    margin: 5
  },
  bigAvatar: {
    margin: "1rem",
    width: "5rem",
    height: "5rem"
  }
});

function Pic(props) {
  const classes = useStyles();

  return (
    <Avatar
      alt="photo of user"
      src={props.photo}
      className={classes.bigAvatar}
    />
  );
}

export default Pic;
