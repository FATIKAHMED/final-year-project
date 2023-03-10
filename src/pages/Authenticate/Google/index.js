import { axiosDEF } from 'utils/axios';
import React, { useEffect, useState } from 'react'
import {
    useHistory,
    // useLocation 
} from 'react-router-dom';
import { BASE_URL } from 'utils/constants';
import { useDispatch } from 'react-redux';
import { authenticateAction } from 'redux/actions'


const Index = ({ code }) => {
    const history = useHistory()
    // let location = useLocation();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (code) {
            // console.log("USEEFFECT Google Authenticate", code)
            axiosDEF.post(`/api/account/google/register`, { code })
                .then(response => {
                    setLoading(false)
                    setSuccess(true)
                    // console.log(BASE_URL, response);

                    // Todo Check response : if user exists goto Home page else enable account setup
                    dispatch(authenticateAction(response.data))
                    history.push('/');
                })
                .catch(err => {
                    setLoading(false)
                    setSuccess(false)
                    console.error(BASE_URL, err);
                    history.push('/login');
                })
        }
    }, [code])

    if (loading)
        return <p>Loading...</p>
    return success ? <p>Success</p> : <p>There was a problem in signing up!</p>
}

export default Index
