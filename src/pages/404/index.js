import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    notfoundContainer: {
        display: "grid",
        placeItems: "center",
        position: 'relative',
        // top: "50px",
        marginTop: "100px",
        "& h1": {
            fontSize: "50px",
        },
        "& p": {
            fontSize: "13px",
            marginBottom: "20px",
        }
    }
}))
const NotFoundPage = () => {
    const classes = useStyles()
    return (
        <Container>
            <div className={classes.notfoundContainer}>
                <h1>404, NOT FOUND</h1>
                <p>Oops, looks like the page you were trying to find was not found</p>
                <Link to='/'>Go back</Link>
            </div>
        </Container>
    )
}

export default NotFoundPage
