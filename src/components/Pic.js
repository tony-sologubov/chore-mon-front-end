import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
// import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: "1.5rem",
    width: "8rem",
    height: "8rem"
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
