import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import { v4 as uuidv4 } from 'uuid';

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

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const TableBed = ({rows,max}) =>{
  // const [rows,setRows]=useState([]);
  // const rows=rowsOut;
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  // const [emptyRows,setEmpty] = useState(rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage));
  const calc= rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  const emptyRows=((calc >=4 )? 4 : calc ) ;
  const maxPage=(Math.ceil(rows.length/rowsPerPage));
  
  
  useEffect(() => {
    const processRow= () => {
      // setRows(rowsOut);
      // console.log(rowsOut);
      setPage(((Math.ceil((new Date()).getSeconds()/2)%maxPage)));
      // setEmpty(rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage));
      // setMax(Math.ceil(rows.length/rowsPerPage));
      // console.log("rowpage",rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage));
      // console.log("row",rows);
      // console.log("emptyrow",emptyRows);
      // console.log("maxPage",maxPage);
    }
    const interval = setInterval(processRow, 2);
    processRow();
    return () => clearInterval(interval);
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className="shadow-sm p-1 border border-dark rounded-lg">
    <small className="text-secondary">{page+1}</small>
      <Table  aria-label="custom pagination table">
      <TableHead>
                <TableRow>
                  <TableCell   component="th" scope="row" key={uuidv4()} align="left">
                    Bed
                  </TableCell>
                  <TableCell component="th" scope="row" key={uuidv4()} align="right">
                    Visitors
                  </TableCell>
                </TableRow>
              </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={uuidv4()} selected={Number(row.visitorCount)===Number(max) ?true:false} >
              <TableCell component="th" scope="row" key={uuidv4()}>
                {row.BedNumber}
              </TableCell>
              <TableCell align="right" key={uuidv4()}>
                {`${row.visitorCount}`}{max!==100?`/${max}`:null}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{height: 53 * emptyRows }}>
              <TableCell key={uuidv4()} colSpan={6} />
            </TableRow>
          )}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default TableBed;
// Logo dibawah , tapi gak kepake lagi
        {/* <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter> */}