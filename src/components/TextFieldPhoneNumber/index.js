import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    InputLabel,
    //  TextField, InputAdornment, FormHelperText 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiPhoneNumber from 'material-ui-phone-number';

const useStyles = makeStyles((theme) => ({
    phoneInputContainer: {
        marginBottom: "28px",

    },
    phoneInputLabel: {
        color: theme.palette.text.primary,
        marginBottom: "5px",
        fontSize: "15px",
        fontFamily: "Poppins",
        // marginTop: "10px",
        fontWeight: 300
    },
    phoneInput: {
        "& .MuiInputBase-root": {
            background: theme.palette.background.paper,
            // lightGray3
            border: `1px solid ${theme.palette.border.gray3}`,
            color: "inherit",
            fontSize: "15px",
            fontWeight: "300",
            // width: "250px",
            borderRadius: "6px",
            transition: "all 0.4s ease",
            "& .MuiOutlinedInput-inputMarginDense": {
                paddingTop: null,
                paddingBottom: null,
            },
            "&:hover": {
                background: theme.palette.background.hover,
            },
            "&:focus-within": {
                // darkBlue
                border: `1px solid ${theme.palette.background.darkBlue}`,
                background: theme.palette.background.hover,

            },
            "& ::placeholder": {
                // lightGray3
                color: theme.palette.border.gray3,
            },
            "& fieldset": {
                borderRadius: "6px",
                border: "none",
            },
        }

    },
    phoneInputDisabled: {
        color: theme.palette.text.disabled,
        background: theme.palette.background.hover,
        "&:hover": {
            background: theme.palette.background.hover,
            color: theme.palette.text.disabled,
        },
    },
    phoneInputError: {
        borderColor: theme.palette.error.main,
        "&:focus-within": {
            borderColor: theme.palette.error.main,
        },
    },
    phoneInputHelperText: {
        color: theme.palette.error.main + " !important",
        fontSize: ".7rem !important",
    },

}));
const TextInputFieldPhoneNumber = ({
    label,
    name,
    placeholder,
    disabled,
    type = "text",
    required,
    value,
    defaultValue,
    onChange,
    error,
    errorText,
    autoFocus,
    icon,
    isSearchField,
    endIcon,
    propStyles,
    forgotPasswordHelper,
    forgotPasswordCallback,
    ...rest
}) => {
    const [country, setCountry] = useState('pk')

    useEffect(() => {
        const getGeoInfo = async () => {
            const response = await axios.get('https://api.hostip.info/country.php');
            setCountry(response.data)
        };
        getGeoInfo()
    }, [])


    const classes = useStyles(propStyles);
    return (
        <div className={classes.phoneInputContainer}>
            <InputLabel
                className={classes.phoneInputLabel}
                htmlFor={'phoneNumber'}
            >
                Phone Number
            </InputLabel>
            <MuiPhoneNumber
                fullWidth
                defaultCountry={country.toLowerCase()}
                className={classes.phoneInput}
                variant="outlined"
                onChange={(e) => onChange(e)}
                InputProps={{
                    classes: {
                        disabled: classes.phoneInputDisabled,
                        error: classes.phoneInputError,
                    },
                }}
                error={error}
                helperText={error && errorText}
                FormHelperTextProps={{ classes: { root: classes.phoneInputHelperText } }}
                {...rest}
            />
        </div>
    );
};

export default TextInputFieldPhoneNumber;