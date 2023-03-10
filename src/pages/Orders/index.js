// * Libraries
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { Button, Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getOrderRecieptAction, getOrderHistoryAction } from 'redux/actions'

// * Utitlities
import { dateFormat } from "utils/convertTime";

// * Icons
import { IoCartOutline } from 'react-icons/io5'
import EmptyCartPNG from "assets/emptyCart.png";

// * Components
import Pagination from "components/Pagination";

const useStyles = makeStyles((theme) => ({
  tableRoot: {
    "& .MuiTableCell-body": {
      border: 0,
      fontFamily: theme.typography.fontFamily
    },
    "& .MuiTableHead-root, & .MuiTableBody-root,& .MuiTableCell-root": {
      fontFamily: theme.typography.fontFamily,
      // backgroundLayout
      background: theme.palette.background.home,
      border: 0,
    },
    "& .MuiTableCell-root": {
      paddingLeft: 0,
      // minWidth: "10rem",
      minWidth: "8rem",
    },
    "& .MuiTableRow-root": {
      height: "6rem",
      borderBottom: "1px solid lightgrey"
    },
    "& .MuiTableHead-root": {
      height: "4.5rem"
    },
    "& .MuiTableRow-head": {
      borderBottom: `1px solid ${theme.palette.text.header}`,
      paddingTop: "0.6rem",
      height: "auto",
    },

  },
  tableCont: {
    minHeight: "30rem",
    padding: "4rem 1.5rem 2.5rem 1.5rem",
    "& .iconTitle": {
      verticalAlign: "middle",
      width: "100%",
      minWidth: "24rem",
      minHeight: "6rem",
      display: "grid",
      gridTemplateColumns: "min-content 1fr",
      alignItems: "center"
    },

    "& .title": {
      fontWeight: "600",
      margin: ".5rem 0",
    },
    "& .title,& .subtitle": {
      color: theme.palette.text.header,
    },
    "& .btnTable": {
      borderRadius: "6px",
      border: `1px solid ${theme.palette.background.purple} `,
      textTransform: "capitalize",
      "&:hover": {
        color: theme.palette.background.purple,
        background: `${theme.palette.background.verylightPurple} `,
      },
    },
    "& .link": {
      color: theme.palette.text.link_sec,
      // maxWidth: "76%",
      maxWidth: "90%",
      whiteSpace: "pre-line",
      overflow: "hidden",
      textOverflow: "ellipsis",

    },
    "& .icon": {
      height: "2em",
      width: "2em",
      verticalAlign: "middle",
      marginRight: ".5rem",
    },
    "& .priceCell": {
      minWidth: "6rem",
    },
    "& .invoiceCell": {
      minWidth: "10rem",
    },
    "& .MuiPagination-ul": {
      marginTop: "2rem",
      justifyContent: "center",
    },

  },
  pagination: {
    "& .Mui-selected": {
      background: "transparent !important",
      border: 0,
      borderRadius: 0,
      borderBottom: `1px solid ${theme.palette.text.header} !important`,
    },
    "& .MuiPaginationItem-outlined": {
      border: 0,
      borderRadius: 0,
    },
    "& .Mui-disabled,& .MuiPaginationItem-previousNext": {
      // lightGray3
      border: `1px solid ${theme.palette.border.gray3}`,
      background: theme.palette.common.white,
      borderRadius: "100%",
    },

  },
  emptyCart: {
    width: "300px",
  },
  noItemsinCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // padding: "10px",
    // borderRadius: '10px',
    margin: "50px 0",
    // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    "& .title": {
      margin: "10px 0 3px  0",
    },
    "& .desc": {
      fontWeight: "400",
      textDecoration: "underline"
    },
  },

}))

const Orders = () => {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)
  const myOrders = useSelector((state) => state.order.history);

  const [loading, setLoading] = useState(false)

  const handleClickReciept = async (orderId) => {
    const result = await dispatch(getOrderRecieptAction(orderId))
    if (result.res)
      history.push('/reciept')
  }


  const handleGetOrders = async (page, limit) => {
    setLoading(true)

    await dispatch(getOrderHistoryAction(user._id, page))


    setLoading(false)
  }


  const onPageChange = async (e, page) => {
    handleGetOrders(page)
  }

  return (
    <Container>

      <div className={classes.tableCont}>
        <Typography variant="h5" component="h4" className="title">
          My orders
        </Typography>
        <Typography variant="body1" component="p" className="subtitle">
          All of your order purchase history  will be listed here
        </Typography>
        <TableContainer elevation={0} component={Paper}>
          <Table
            classes={{ root: classes.tableRoot }}
            sx={{ minWidth: 650 }} aria-label="simple table">

            <TableHead >
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Order date</TableCell>
                <TableCell className="priceCell">Price</TableCell>
                <TableCell>Payment type</TableCell>
                <TableCell></TableCell>
                <TableCell className="invoiceCell"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {myOrders.docs.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell className="iconTitle">
                    <IoCartOutline className="icon" />
                    <span className="link">{
                      row.course.length > 1 ?
                        row.course.map(course => (`${course.title}, `)) :
                        row.course.map(course => course.title)
                    }</span>
                  </TableCell>
                  <TableCell align="left">{dateFormat(row.createdAt)}</TableCell>
                  <TableCell align="left" className="priceCell">${row.amount}</TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left"><Button onClick={() => handleClickReciept(row._id)} className="btnTable" variant="outlined">Reciept</Button></TableCell>
                  <TableCell align="left" className="invoiceCell">{row.invoice ? <Button className="btnTable" variant="outlined">Invoice</Button> : "Invoice unavailable"}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
        {myOrders.docs.length <= 0 &&
          (<div className={classes.noItemsinCart}>
            <div className="col1">
              <img
                src={EmptyCartPNG}
                alt="empty cart"
                className={classes.emptyCart}
              />
              <div className="info">
                <h4 className="title">There are no orders</h4>
                <p className="desc"><Link to="/courses">Add to Cart Now!</Link></p>
              </div>
            </div>
          </div>)
        }

        {myOrders.totalPages > 1 && (
          <Pagination
            pageChangeCallback={onPageChange}
            count={myOrders.totalPages}
          />
        )}

      </div>

    </Container>
  );
};

export default Orders;
