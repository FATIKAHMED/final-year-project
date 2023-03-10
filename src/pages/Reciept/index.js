// * Libraries
import React from "react";
import { Container, Typography, Divider, CircularProgress } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

// * Utilities
import { dateFormat } from "utils/convertTime";


const useStyles = makeStyles((theme) => ({
  tableRoot: {
    "& .MuiTableCell-body": {
      border: 0,
      fontFamily: theme.typography.fontFamily,
    },
    "& .MuiTableHead-root, & .MuiTableBody-root,& .MuiTableCell-root": {
      fontFamily: theme.typography.fontFamily,
      // backgroundLayout
      background: theme.palette.background.home,
      border: 0,
    },
    "& .MuiTableCell-root": {
      paddingLeft: 0,
      minWidth: "9rem",
    },
    "& .MuiTableHead-root": {
      height: "4.5rem",
    },
    "& .MuiTableRow-head": {
      borderBottom: `1px solid ${theme.palette.text.header}`,
      paddingTop: "0.6rem",
    },
  },
  tableGrid: {
    display: "grid !important",
    gridTemplateColumns: "70fr 15fr 15fr !important",
  },
  totalTableGrid: {
    display: "grid !important",
    gridTemplateColumns: "70fr 15fr 15fr !important",
    gridTemplateAreas: `". total price" !important`,
    "& .totalCell": {
      gridArea: "total",
    },
    "& .priceCell": {
      gridArea: "price",
    },
  },

  container: {
    minHeight: "30rem",
    padding: "4rem 1.5rem 2.5rem 1.5rem",
    // padding: "2.5rem 1.5rem",
    "& .title": {
      fontWeight: "600",
      margin: "2rem 0",
      color: theme.palette.text.header,
    },
  },
  infoWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",

    "& .leftBox": {
      padding: "2rem 0",
      paddingTop: "0.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      "& .title": {
        fontWeight: "400",
        marginBottom: "0.5rem",
      },
      "& .address": {
        maxWidth: "20rem",
        marginBottom: "0.3rem",
      },
      "& .webLink": {
        color: "blue",
      },
      "& .title,& .address,& .webLink": {
        [theme.breakpoints.down(400)]: {
          fontSize: ".9rem",
        },
      }
    },
    "& .rightBox": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      "& .date, & .order,& .soldTo": {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        [theme.breakpoints.down(400)]: {
          fontSize: ".9rem",
        }
      },
      "& .date p:nth-child(1), .order p:nth-child(1),.soldTo p:nth-child(1)": {
        fontWeight: "600",
      },
    },
  },
  summaryWrapper: {
    marginBottom: "1rem",
  },
}));

const Reciept = () => {
  const classes = useStyles();
  const reciept = useSelector(state => state.order.reciept)

  if (reciept)
    return (
      <Container>
        <div className={classes.container}>
          <Typography variant="h5" component="h5" className="title">
            Reciept - {dateFormat(reciept.date)}
          </Typography>
          <Divider />
          <div className={classes.infoWrapper}>
            <div className="leftBox">
              <Typography variant="h5" component="h5" className="title">
                {reciept.info.title}
              </Typography>
              <Typography variant="body1" component="p" className="address">
                {reciept.info.address}
              </Typography>
              <Typography variant="body1" component="p" className="webLink">
                {reciept.info.link}
              </Typography>
            </div>
            <div className="rightBox">
              <div className="date">
                <Typography variant="body1" component="p">
                  Date
                </Typography>
                <Typography variant="body1" component="p">
                  {dateFormat(reciept.date)}
                </Typography>
              </div>
              <div className="order">
                <Typography variant="body1" component="p">
                  Order #
                </Typography>
                <Typography variant="body1" component="p">
                  {reciept.orderHash}
                </Typography>
              </div>
              <div className="soldTo">
                <Typography variant="body1" component="p">
                  Sold To
                </Typography>
                <Typography variant="body1" component="p">
                  {reciept.soldTo}
                </Typography>
              </div>
            </div>
          </div>
          <Divider />
          <div className={classes.summaryWrapper}>
            <TableContainer elevation={0} component={Paper}>
              <Table
                classes={{ root: classes.tableRoot }}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow className={classes.tableGrid}>
                    <TableCell>Item</TableCell>
                    <TableCell>Order date</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {reciept.items.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className={classes.tableGrid}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="left">{dateFormat(row.date)}</TableCell>
                      <TableCell align="left">${row.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className={classes.totalTableGrid}>
                    <TableCell className="totalCell">
                      <Typography
                        style={{ fontWeight: 600 }}
                        variant="h6"
                        component="p"
                      >
                        Total paid
                      </Typography>
                    </TableCell>
                    <TableCell className="priceCell">
                      <Typography variant="h6" component="p">
                        ${reciept.total}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Divider style={{ marginBottom: "1.8rem" }} />
          <div className="faq">
            If you have any questions about this receipt please contact our{" "}
            <span style={{ color: "blue" }}>support team</span>.
          </div>
        </div>
      </Container>
    );
  else return (
    <CircularProgress />
  );
};

export default Reciept;
