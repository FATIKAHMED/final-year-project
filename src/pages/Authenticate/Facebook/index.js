import { axiosDEF } from 'utils/axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
// import { BASE_URL } from 'utils/constants';
import { useDispatch } from 'react-redux';
import { authenticateAction } from 'redux/actions'

const Index = ({ code }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    let location = useLocation();
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (code) {
            axiosDEF.post(`/api/account/facebook/register`, { code })
                .then(response => {
                    setLoading(false)
                    setSuccess(true)
                    // * Todo Check response : if user exists goto Home page else enable account setup
                    dispatch(authenticateAction(response.data))

                    history.push('/');
                })
                .catch(error => {
                    setLoading(false)
                    setSuccess(false)
                    // console.log("ERROR AUTHENTICATE FACEBOOK")
                    if (error.response.status === 400) {
                        alert(error.response.data.message)
                    }
                    history.push('/login');
                })
        }
    }, [code])

    if (loading)
        return <p>Loading...</p>
    return success ? <p>Success</p> : <p>There was a problem in signing up!</p>
}

export default Index
