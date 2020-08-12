import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),
  createData(Math.ceil(Math.random()*100),Math.ceil(Math.random()*10)),

].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function TableBed() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [direction,setDirection]=React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    // console.log('page',page);
    // console.log('rowperpage',rowsPerPage);
    // console.log('emptyrow',emptyRows);
    // console.log(Math.ceil(rows.length/rowsPerPage));
    useEffect(()=>{
                const getData = async ()=>{
                    // if(page===(Math.ceil(rows.length/rowsPerPage)-1)&&(Math.ceil(rows.length/rowsPerPage)-1)!==0) setDirection(-1);
                    // if(page===0 &&(Math.ceil(rows.length/rowsPerPage)-1)!==0) setDirection(1);
                    // const length=(Math.ceil(rows.length/rowsPerPage)-1);
                    // if(page<length)setPage(page+1);
                    // if(page===length+1)setPage(0);
                    // console.log(page);
                    console.log(performance.now());
                    setPage(page+2);
        }
        const interval = setInterval(getData,2000);
        return ()=>clearInterval(interval);
    },[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className="shadow-sm p-2 border border-dark rounded-lg">
      <Table  aria-label="custom pagination table">
      <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row" key={0} align="left">
                    Bed
                  </TableCell>
                  <TableCell component="th" scope="row" key={1} align="right">
                    Visitors
                  </TableCell>
                </TableRow>
              </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                {row.calories}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
