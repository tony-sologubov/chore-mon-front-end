import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const devImages = [
  "../assets/backgrounds/1.jpg",
  "../assets/backgrounds/2.png",
  "../assets/backgrounds/3.jpg",
  "../assets/backgrounds/4.png",
  "../assets/backgrounds/5.jpg",
  "../assets/backgrounds/6.jpg",
  "../assets/backgrounds/7.jpg",
  "../assets/backgrounds/8.png"
];

var random = "../assets/backgrounds/8.png";

var random = devImages[Math.floor(Math.random() * devImages.length)];

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins, sans-serif"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 250,
    width: "100%"
  },
  image: {
    position: "relative",
    height: "10rem",

    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: "100%"
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`
  },
  imageMarked: {
    height: ".2rem",
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
}));

const ComplexButton = props => {
  console.log(props.groupName);
  const classes = useStyles();
  const image = {
    // url: `https://source.unsplash.com/800x450/?${
    //   props.groupName.match(/[^\s,.'"!?]+/)[0]
    // }`,
    url: "https://photos.app.goo.gl/CAEWVSPAmYEthRcp6",
    title: props.groupName,
    width: "100%"
  };
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      </MuiThemeProvider>
    </div>
  );
};

export default ComplexButton;
