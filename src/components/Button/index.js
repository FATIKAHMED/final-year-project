import React from 'react'
import { CircularProgress, Button } from '@material-ui/core'


const _Button = ({ children, disabled, onClick, className }) => {
    return (
        <Button
            className={className}
            onClick={onClick}
            disabled={disabled}
        >{children}
            {disabled && <CircularProgress size={24} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12,
            }} />}
        </Button>
    )
}

export default _Button
