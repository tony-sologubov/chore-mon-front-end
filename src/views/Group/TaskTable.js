import React, { Component } from "react";
import TinyPic from "../../components/TinyPic";
import Modal from "react-responsive-modal";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      editing: false,
      editTaskId: "",
      assignedTo: "",
      order: "asc",
      orderBy: "dueDate",
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      rows: [],
      checked: false
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.tasks !== prevProps.tasks) {
      this.setState({ rows: this.props.tasks });
    }
  }

  useStyles = makeStyles => theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3)
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750,
      width: "100%"
    },
    tableWrapper: {
      overflowX: "auto"
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },

    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      flex: "0 0 auto"
    },
    tbroot: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    }
  });

  handleRequestSort = (event, property) => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";

    this.setState({
      order: isDesc ? "asc" : "desc",
      orderBy: property
    });
  };

  handleSelectAllClick = event => {
    console.log("event");
    if (event.target.checked) {
      console.log("checkfired");
      const newSelecteds = this.state.rows.map(m => m.id);
      console.log(newSelecteds);
      this.setState({
        selected: newSelecteds
      });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    event.preventDefault();
    const selectedIndex = this.state.selected.indexOf(id);
    console.log(selectedIndex);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1)
      );
    }

    this.setState({
      selected: newSelected
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: +event.target.value
    });
  };

  handleChangeDense = event => {
    this.setState({
      dense: event.target.checked
    });
  };

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  getSorting = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  };

  find = id => {
    const mem = this.props.members.filter(m => m.uid === id);
    if (mem[0]) {
      return mem[0].profilePicture;
    } else {
      return "no asignee";
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editTask = task => {
    console.log("Edit Task");
    console.log(task);
    if (!this.state.editTaskId) {
      return this.setState({
        editing: !this.state.editing,
        editTaskId: task.taskId,
        assignedTo: task.assignedTo
      });
    } else {
      return this.setState({
        editing: !this.state.editing,
        editTaskId: "",
        title: ""
      });
    }
  };

  submit = e => {
    e.preventDefault();
    if (this.state.title) {
      this.props.edit(
        {
          assignedTo: this.state.assignedTo,
          title: this.state.title,
          groupId: this.props.groupId
        },
        this.state.editTaskId
      );
    }
    return this.setState({
      editing: !this.state.editing,
      editTaskId: "",
      title: ""
    });
  };

  //Opens delete modal
  open = () => {
    this.setState({ open: true, error: false });
  };

  //Closes delete modal
  close = () => {
    this.setState({ open: false, error: false });
  };

  render() {
    const {
      rowsPerPage,
      page,
      selected,
      order,
      orderBy,
      dense,
      rows
    } = this.state;

    const {
      handleRequestSort,
      handleSelectAllClick,
      handleClick,
      handleChangePage,
      handleChangeRowsPerPage,
      handleChangeDense,
      desc,
      stableSort,
      getSorting,
      find,
      handleChange,
      editTask,
      submit
    } = this;

    const classes = this.useStyles();
    const rowCount = rows.length;

    const numSelected = selected.length;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const isSelected = title => this.state.selected.indexOf(title) !== -1;

    const createSortHandler = property => event => {
      this.handleRequestSort(event, property);
    };

    const headRows = [
      { id: "title", numeric: false, disablePadding: true, label: "Task" },
      {
        id: "assignedTo",
        numeric: false,
        disablePadding: false,
        label: "Assigned:"
      },
      {
        id: "dueDate",
        numeric: false,
        disablePadding: false,
        label: "Due Date:"
      },
      { id: "actions", numeric: false, disablePadding: false, label: "Actions" }
    ];

    return (
      <div className="mytable">
        <Paper className={classes.paper}>
          <Toolbar
            className={clsx(classes, {
              [classes.highlight]: numSelected > 0
            })}
          >
            <div className={classes.title}>
              {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                  {numSelected} selected
                </Typography>
              ) : (
                <Typography variant="h6" id="tableTitle">
                  Tasks
                </Typography>
              )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              {numSelected > 0 ? (
                <Tooltip title="Delete" onClick={this.props.open}>
                  <IconButton aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Filter list">
                  <IconButton aria-label="Filter list">
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </Toolbar>
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={numSelected === rowCount}
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "Select all desserts" }}
                    />
                  </TableCell>
                  {headRows.map(row => (
                    <TableCell
                      key={row.id}
                      align={row.numeric ? "center" : "left"}
                      padding={row.disablePadding ? "none" : "default"}
                      sortDirection={orderBy === row.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === row.id}
                        direction={order}
                        onClick={createSortHandler(row.id)}
                      >
                        {row.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const selected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const date = new Date(row.dueDate).toLocaleDateString(
                      "en-US"
                    );

                    const photo = this.find(row.assignedTo);

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={selected}
                        tabIndex={-1}
                        key={row.id}
                        selected={selected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId}>
                          {row.title}
                        </TableCell>
                        <TableCell>
                          <TinyPic photo={photo} />
                        </TableCell>
                        <TableCell>{date}</TableCell>
                        <TableCell>
                          <button onClick={() => editTask(row)}>Edit</button>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="table-footer">
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </Paper>

        {this.state.editing && (
          <form onSubmit={e => this.submit(e)}>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </form>
        )}
      </div>
    );
  }
}

export default withRouter(TaskTable);
