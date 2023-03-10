// * Libraries
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { fillupCourseSearchAction, searchCourse } from 'redux/actions'
import { Link, useHistory } from "react-router-dom"
import Pagination from "components/Pagination";
// import Pagination from "@material-ui/lab/Pagination";

// * Components
import {
    Button,
    Container,
    Box, MenuItem, Select,
    Grid, FormGroup, FormLabel,
    FormControl,
    InputAdornment,
    CircularProgress,
    Chip
} from "@material-ui/core";
import TextField from 'components/TextField'

// * Assets
import BannerImage from "assets/banner2.jpg"
import CourseImage from "assets/course.jpg"
import CategoryImage from "assets/category.jpg"
import TestimonialImage1 from "assets/testimonial1.png"
import TestimonialImage2 from "assets/testimonial2.png"
import TestimonialImage3 from "assets/testimonial3.png"
import TestimonialGraphic from "assets/testimonialsGraphic.png"
import TestimonialGraphic1 from "assets/testimonialsGraphic1.png"
import landingBanner from "assets/Landing Page intro banner.png"
import BookSvg from "assets/book.png"
import GradeSvg from "assets/grades.svg"
import PersonSvg from "assets/person.svg"
import QuotesSvg from "assets/quotes.svg"
import Blob1 from "assets/Vectorblob1.png"
import Blob2 from "assets/VectorBlob2.png"
import onlineLearn from 'assets/onlineLearn.svg'
import studying from 'assets/study.svg'
import EmptySearchResult from 'assets/search_result_empty.svg'

// * Icons
import { BiSearch } from "react-icons/bi";
import { BsCaretDownFill } from "react-icons/bs";
import isEmpty from "utils/is-empty";
import SearchSkeleton from "components/SearchSkeleton";

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        minHeight: '50vh',
        "& .paginationCont": {
            marginTop: "3rem"
        }
    },
    pagination: {
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
        "& .Mui-disabled, & .MuiPaginationItem-previousNext": {
            // lightGray3
            // border: `1px solid ${theme.palette.border.gray3}`,
            // border: 'none',
            // background: theme.palette.common.white,
            // borderRadius: "100%",
        },
    },
    searchFieldRoot: {
        borderRadius: "4px",
        border: `1px solid ${theme.palette.border.gray2} !important`,
    },
    searchFormContainer: {
        margin: '100px auto',
        "& .search-form-group": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: '20px',
            "& > div": {
                width: "70%",
                [theme.breakpoints.down("540")]: {
                    width: "90%",
                },
            }
        }
    },
    searchItemContainer: {
        "& .search-metadata": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: '20px',
            "& p": {
                color: theme.palette.text.cardTitle,
                [theme.breakpoints.down(400)]: {
                    fontSize: ".8rem"
                }
            },
            "& p:last-child": {
                color: theme.palette.text.header,
            },
        },
        "& .search-container": {
            "& .search-list-container": {
                "& .list-item": {
                    background: theme.palette.background.paper,
                    boxShadow: theme.palette.boxShadow.search,
                    borderRadius: "6px",
                    padding: '20px',
                    marginBottom: '1rem',

                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: '20px',

                    [theme.breakpoints.down(660)]: {
                        flexDirection: "column",
                        maxWidth: "400px",
                        margin: "0 auto",
                        marginBottom: "1rem",
                        alignItems: "flex-start",
                    },

                    "& .image-link": {
                        // position: 'absolute',
                        // height: '0',
                        // width: '0',
                        // borderTop: '0 solid transparent',
                        // borderBottom: '80px solid transparent',
                        // borderLeft: `50px solid ${theme.palette.background.searchOverlay}`,
                        // opacity: 0.9
                    },


                    "& .content": {

                        "& .head": {
                            fontWeight: 500,
                            "& .title": {
                                display: "block",
                                fontSize: "0.7rem",
                                color: theme.palette.text.cardTitle,
                                "display": "-webkit-box",
                                "overflow": "hidden",
                                "fontWeight": "500",
                                "textOverflow": "ellipsis",
                                "whiteSpace": "pre-wrap",
                                "WebkitBoxOrient": "vertical",
                                "WebkitLineClamp": "1",
                                [theme.breakpoints.down(660)]: {
                                    "maxWidth": "240px",
                                }
                            },
                            "& .headline": {
                                color: theme.palette.text.header,
                                display: "block",
                                fontSize: "1.2rem",
                                marginBottom: ".3rem",
                                "display": "-webkit-box",
                                "overflow": "hidden",
                                "fontSize": "15px",
                                "fontWeight": "500",
                                "textOverflow": "ellipsis",
                                "whiteSpace": "pre-wrap",
                                "WebkitBoxOrient": "vertical",
                                "WebkitLineClamp": "2",
                                [theme.breakpoints.down(660)]: {
                                    "maxWidth": "240px",
                                }
                            },
                        },
                        "& .chip": {
                            background: "transparent !important",
                            border: `1px solid ${theme.palette.text.pill} !important`,
                            color: ` ${theme.palette.text.pill} !important`,
                            marginBottom: ".6rem",
                            "marginRight": ".2rem",
                            // [theme.breakpoints.down(660)]: {
                            // }
                        },
                    },
                    '& img': {
                        height: '80px',
                        minWidth: '140px',
                        width: "1rem",
                        borderRadius: "6px",
                        [theme.breakpoints.down(660)]: {
                            height: '14rem',
                            minWidth: '140px',
                            width: "100%",
                            maxWidth: "100%",
                        },
                    }

                },

            },

        },
        "& .no-search-result": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "2rem",
            "& img": {
                maxWidth: '400px',
                marginBottom: '20px',
            },

            [theme.breakpoints.down("500")]: {
                textAlign: "center",
                "& h3": { fontSize: "1.2rem" },
                "& p": {
                    fontSize: ".9rem"
                },
                "& img": {
                    [theme.breakpoints.down("500")]: {
                        maxWidth: "100%"
                    },
                },
            },

        }

    },
    ctaButton: {
        background: theme.palette.background.purple,
        textTransform: 'none',
        padding: "15px 40px",
        borderRadius: "6px",
        color: theme.palette.background.paper,
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.12)',
        "&:hover": {
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.22)',
            background: theme.palette.background.purple,
        },
        "& a": {
            color: theme.palette.common.white,
            // padding: "7px 15px",
            textDecoration: "none",
            fontSize: '18px',
            fontWeight: '500',

        },

    },

    pagination: {
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
            border: `1px solid ${theme.palette.border.gray3}`,
            background: theme.palette.common.white,
            borderRadius: "100%",
        },
    },

}));

const SearchPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const courseSearch = useSelector((state) => state.search.course)
    const searchQuery = useSelector((state) => state.search.query)
    const history = useHistory();

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setSearch(searchQuery)
    }, [searchQuery])

    const handleSubmitSearch = async (page, limit) => {
        setLoading(true)
        const { res, error } = await dispatch(searchCourse(search, page, limit))

        if (res) {
            history.push(res);
        } else {
            history.push('/404');
        }

        setLoading(false)
    }

    const onPageChange = async (page) => {
        handleSubmitSearch(page)
    }

    return (
        <Container className={classes.pageContainer}>
            <div className={classes.searchFormContainer}>
                <FormGroup className="search-form-group">
                    <TextField
                        value={search}
                        onChange={(e) => setSearch(e)}
                        // disableUnderline
                        disabled={loading}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmitSearch()
                            }
                        }}
                        isSearchField={true}
                        classes={{
                            root: classes.searchFieldRoot,
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><BiSearch style={{ color: "grey" }} /></InputAdornment>,
                            // disableUnderline: true,
                            // endAdornment: <InputAdornment position="start"><BiSearch /></InputAdornment>,
                            // endAdornment: endIcon && value.length > 0 && (
                            //   <InputAdornment position="end">{endIcon}</InputAdornment>
                            // ),
                        }}
                        variant='outlined' placeholder="Search courses" />
                    <Button variant="contained" classes={{ root: classes.ctaButton }} disabled={loading} onClick={() => handleSubmitSearch()}>Search</Button>
                </FormGroup>

                {/* <Grid item xs={12} lg={6}>
                        <FormGroup>
                            <FormLabel>Select subject</FormLabel>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <Select
                                    className={classes.selectInput}
                                >
                                    <MenuItem>Chemistry</MenuItem>
                                </Select>

                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Filter by</FormLabel>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <Select
                                    className={classes.selectInput}
                                >
                                    <MenuItem>All</MenuItem>
                                </Select>

                            </FormControl>
                        </FormGroup>
                    </Grid> */}
            </div>

            {/* {loading ? <CircularProgress size={24} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
            }} /> : */}
            {loading ? <SearchSkeleton /> :
                <div className={classes.searchItemContainer}>

                    {courseSearch.totalDocs > 0 ?
                        <>
                            <div className='search-metadata'>
                                <p>
                                    Showing results for '{searchQuery}'
                                </p>
                                <p>
                                    {courseSearch.totalDocs > 1 ? `${courseSearch.totalDocs} results found` : `${courseSearch.totalDocs} result found`}
                                </p>
                            </div>

                            <div className='search-container'>
                                <ul className='search-list-container'>
                                    {courseSearch.docs.map((item) =>

                                        <li key={item.slug} className='list-item'>
                                            {/* <Link className='image-link'>
                                            </Link> */}
                                            <img src={item.coverPhoto} height="auto" width={"auto"} />
                                            <div className='content'>
                                                <p>
                                                    <Link to={`/courses/${item.slug}`} className="head"><span className="title">{item.title}</span> <span className="headline">{item.headline}</span></Link>
                                                </p>
                                                {item.categories?.slice(0, 3).map((item, index) => <Link to={`/categories/${item.slug}`} key={item.slug}><Chip size="small" label={item.title} className="chip" /></Link>)}
                                                {item.categories?.length > 3 && <Chip size="small" label={`+${item.categories.length - 3}`} className="chip" />}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </>
                        :
                        <div className='no-search-result'>
                            <img src={EmptySearchResult} alt="no result" />
                            <h3>Sorry no results found</h3>
                            <p>Try again searching for something else.</p>
                        </div>
                    }
                </div>
            }

            {courseSearch.totalPages > 1 && (
                <Pagination
                    pageChangeCallback={onPageChange}
                    count={courseSearch.totalPages}
                />
            )}
        </Container>
    )
}

export default SearchPage
