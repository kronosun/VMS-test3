import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
//Redux
import { connect } from "react-redux";

import Moment from "react-moment";
import { v4 as uuidv4 } from "uuid";
import { changeAccess, deleteBook } from "../../../actions/api";
import { setAlert } from "../../../actions/alert";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = ({ numSelected, deleteRow }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Visitation Table
      </Typography>
      {/* 
      <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip> */}

      <i
        className="btn fa fa-trash-alt text-secondary"
        style={{ fontSize: "1.4rem" }}
        onClick={deleteRow}
      />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const TabelSchedule = ({ rows, trigger, setAlert, alert }) => {
  const headCells = [
    { id: "id", numeric: false, disablePadding: false, label: "Visit ID" },
    { id: "room", numeric: true, disablePadding: false, label: "Ward Number" },
    { id: "visitee", numeric: false, disablePadding: false, label: "Visitee" },
    { id: "visitor", numeric: false, disablePadding: false, label: "Visitor" },
    { id: "date", numeric: false, disablePadding: false, label: "Date" },
    { id: "session", numeric: true, disablePadding: false, label: "Sessions" },
    { id: "checkin", numeric: true, disablePadding: false, label: "Check-In" },
    {
      id: "checkout",
      numeric: true,
      disablePadding: false,
      label: "Check-Out",
    },
    { id: "access", numeric: true, disablePadding: false, label: "access" },
  ];

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const sliceSelected = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newselected = [...selected];
    newselected.splice(selectedIndex, 1);
    setSelected(newselected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const deleteRow = async () => {
    try {
      if (selected.length === 0) {
        setAlert("Please Select Row Rirst !", "danger");
        return;
      }
      await selected.map((x) => deleteBook(x));
      await trigger();
      setAlert("Visit Row Deleted Successfully !", "success");
    } catch (error) {
      console.error(error);
    }
  };

  const accessToggle = async (access, id) => {
    await changeAccess(id, access);
    sliceSelected(id);
    setAlert("Access Changed Successfully !", "success");
    trigger();
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      {alert &&
        alert.map((x) => (
          <div class={`alert alert-${x.alertType}`} role="alert">
            {x.msg}
          </div>
        ))}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          deleteRow={deleteRow}
        />
        {rows.length === 0 ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />

              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          key={uuidv4()}
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="left" key={uuidv4()}>
                          {row.room}
                        </TableCell>
                        <TableCell align="left" key={uuidv4()}>
                          {row.visitee}
                        </TableCell>
                        <TableCell align="left" key={uuidv4()}>
                          {row.visitor}
                        </TableCell>
                        <TableCell align="left" key={uuidv4()}>
                          <Moment key={uuidv4()} format="YYYY/MM/DD">
                            {Date.parse(row.date.substring(0, 10))}
                          </Moment>
                          {/* {row.date} */}
                        </TableCell>
                        <TableCell align="left" key={uuidv4()}>
                          {row.session}
                        </TableCell>
                        <TableCell align="left" key={uuidv4()}>
                          {row.checkin ? (
                            <i className="fa fa-2x fa-check-circle text-success" />
                          ) : (
                            <i className="fa fa-2x fa-times-circle text-danger" />
                          )}
                        </TableCell>
                        <TableCell align="left" key={uuidv4()}>
                          {row.checkout ? (
                            <i className="fa fa-2x fa-check-circle text-success" />
                          ) : (
                            <i className="fa fa-2x fa-times-circle text-danger" />
                          )}
                        </TableCell>
                        <TableCell align="left" key={uuidv4()}>
                          {row.access ? (
                            <i
                              className="btn fa fa-2x fa-user-check text-success"
                              onClick={(e) => accessToggle(false, row.id)}
                            />
                          ) : (
                            <i
                              className="btn fa fa-2x fa-user-times text-danger"
                              onClick={(e) => accessToggle(true, row.id)}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    key={uuidv4()}
                    style={{ height: (dense ? 33 : 53) * emptyRows }}
                  >
                    <TableCell key={uuidv4()} colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

TabelSchedule.propTypes = {
  alert: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { setAlert })(TabelSchedule);
