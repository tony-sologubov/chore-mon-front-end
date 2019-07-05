import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const Selector = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    groupId: 0,
    userId: props.userId,
    isAdmin: false,
    success: false,
    open: false
  });

  const [open, setOpen] = React.useState(false);

  const updateState = e => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }
  function handleClickOpen() {
    setState({ ...state, open: true });
  }

  function handleClickClose() {
    setState({ ...state, open: false });
  }

  const handleSubmit = e => {
    e.preventDefault();

    props.add({
      groupId: state.groupId,
      userId: props.userId,
      isAdmin: state.isAdmin
    });

    setState({
      groupId: 0,
      userId: props.userId,
      isAdmin: false,
      success: true
    });
  };

  return (
    <div className="select" style={{ textAlign: "center" }}>
      <Button onClick={handleClickOpen}>Invite to List</Button>
      <Dialog open={state.open} onClose={handleClickClose}>
        <DialogTitle>Select a List</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <FormControl className={classes.formControl}>
              <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={state.groupId}
                name="groupId"
                onChange={e => updateState(e)}
              >
                {props.groups.groups.map(g => {
                  return <MenuItem value={g.groupId}>{g.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Selector;
