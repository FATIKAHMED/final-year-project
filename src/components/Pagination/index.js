import React from 'react'
// import { Link, MemoryRouter, Route } from "react-router-dom"
import { Pagination } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pagination: {
        marginTop: '50px',
        marginBottom: '50px',
        "& .MuiPagination-ul ": {
            justifyContent: "center"
        },
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
            border: `none`,
            background: theme.palette.common.white,
            // borderRadius: "100%",
        },
    },

}));

const PaginationComponent = ({ count = 1, pageChangeCallback }) => {
    const classes = useStyles();

    const onPageChange = async (e, page) => {
        pageChangeCallback(page)
    }

    return (
        <Pagination
            count={count}
            variant="outlined"
            type="start-ellipsis"
            size="large"
            className={classes.pagination}
            onChange={onPageChange}
        />)
}

export default PaginationComponent
