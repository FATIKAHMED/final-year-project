import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    "@keyframes skeletonLoading": {
        "0%": {
            backgroundColor: "hsl(200, 20%, 70%)"
        },
        "100%": {
            backgroundColor: "hsl(200, 20%, 95%)"
        }
    },
    container: {
        "& .skeleton": {
            opacity: 0.7,
            animation: `$skeletonLoading 1s linear infinite alternate`,
        },
        "& .searchMetadata": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: '20px',
            "& .resultQuery": {
                height: ".8rem",
                width: "16rem",
                borderRadius: "5px",
            },
            "& .result": {
                height: ".8rem",
                width: "9rem",
                borderRadius: "5px",
            },
        },
        "& .searchContainer": {
            "& .searchListContainer": {
                "& .listItem": {
                    background: theme.palette.background.paper,
                    boxShadow: theme.palette.boxShadow.search,
                    borderRadius: "6px",
                    padding: '20px',
                    marginBottom: '1rem',
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: '20px',
                    height: "8rem",
                    '& .img': {
                        height: '80px',
                        minWidth: '140px',
                        width: "1rem",
                        borderRadius: "6px",
                        background: "white",
                        opacity: 0.7

                    },
                    "& .content": {

                        "& .head": {
                            "& .title": {
                                display: "block",
                                height: ".8rem",
                                width: "5rem",
                                background: "white",
                                opacity: 0.7,
                                borderRadius: "5px",
                                marginBottom: ".5rem",
                            },
                            "& .headline": {
                                display: "block",
                                height: "1.4rem",
                                width: "12rem",
                                background: "white",
                                opacity: 0.7,
                                borderRadius: "5px",
                                marginBottom: ".5rem",
                            },
                        },
                        "& .chip": {
                            marginBottom: ".6rem",
                            height: "1.2rem",
                            width: "4rem",
                            background: "white",
                            borderRadius: "100px",
                            opacity: 0.7,

                        },
                    },


                },

            },

        },
    }
}));
const myarr = [1, 2, 3]
const SearchSkeleton = () => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className='searchMetadata'>
                <p className="resultQuery skeleton"></p>
                <p className="result skeleton"></p>
            </div>
            <div className='searchContainer'>
                <ul className='searchListContainer'>
                    {
                        myarr.map(el => {
                            return (
                                <li className='listItem skeleton' key={el}>
                                    <div className="img"></div>
                                    <div className='content'>
                                        <p className="head">
                                            <span className="title"></span>
                                            <span className="headline"></span>
                                        </p>
                                        <div className="chip"></div>
                                    </div>
                                </li>)
                        })

                    }
                </ul>
            </div>
        </div>
    )
}

export default SearchSkeleton
