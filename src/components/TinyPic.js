import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
// import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  avatar: {
    margin: 2
  },
  smallAvatar: {
    margin: "0.5rem",
    width: "3rem",
    height: "3rem"
  }
});

function TinyPic(props) {
  const classes = useStyles();

  return (
    <Avatar
      alt="photo of user"
      src={props.photo}
      className={classes.smallAvatar}
    />
  );
}

export default TinyPic;
