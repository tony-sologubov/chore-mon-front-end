import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = () => ({
  container: {
    backgroundColor: "#adcfbe",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    flexWrap: "noWrap",
    alignItems: "center"
  },

  textField: {
    margin: "1rem auto",
    width: "50%",
    backgroundColor: "#fff5e9",
    borderRadius: "0.2rem",
    fontSize: "2rem"
  },
  h1: {
    margin: "2rem"
  },
  dense: {
    marginTop: 0
  },
  menu: {
    width: 100
  }
});

const TaskForm = props => {
  const [formData, setFormData] = useState({
    title: "",
    assignedTo: 0,
    dueDate: new Date(),
    isComplete: false
  });
  //hooks
  const updateFormData = e => {
    console.log(e.target.value);
    setFormData({
      ...formData,

      [e.target.name]: e.target.value
    });
  };
  const updateDate = date => {
    console.log(date);
    console.log(formData);
    setFormData({
      dueDate: date
    });
  };
  const addTaskHandler = e => {
    e.preventDefault();
    console.log(props.groupId);
    console.log(formData);
    props.addTask({
      title: formData.title,
      assignedTo: formData.assignedTo,
      dueDate: formData.dueDate,
      isComplete: false,
      groupId: props.groupId
    });

    setFormData({
      title: "",
      assignedTo: "",
      dueDate: new Date()
    });
  };

  const { classes, members, groupId } = props;
  const { title, assignedTo, dueDate } = formData;

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="on"
      onSubmit={addTaskHandler}
    >
      <h1>Point-O-Matic</h1>
      <h2>Assigned To</h2>
      <TextField
        id="dropdown"
        select
        className={classes.textField}
        value={assignedTo}
        name="assignedTo"
        onChange={e => updateFormData(e)}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
        margin="normal"
      >
        {members.map(m => (
          <MenuItem key={m.userId} value={m.uid}>
            {m.name}
          </MenuItem>
        ))}
      </TextField>
      <h2>Title</h2>
      <TextField
        id="input"
        className={classes.textField}
        value={title}
        name="title"
        onChange={e => updateFormData(e)}
        margin="normal"
      />
      {/* <DatePicker
        name="dueDate"
        allowSameDay={true}
        placeholderText="due date"
        value={dueDate}
        onChange={updateDate}
      /> */}
      <button className="button form-submit" type="submit">
        Save
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskForm);
