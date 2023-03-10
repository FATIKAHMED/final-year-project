import { TextField, InputLabel, InputAdornment, FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    label: {
        color: theme.palette.text.primary,
        marginBottom: "5px",
        fontSize: "15px",
        fontFamily: "Poppins",
        // marginTop: "10px",
        fontWeight: 300
    },
    container: {
        marginBottom: "28px",
    },
    formContainer: {
        marginBottom: "28px",
        paddingLeft: "0.75rem !important",
        paddingRight: "0.75rem !important",
    },
    root: (props) => ({
        background: theme.palette.background.paper,
        // lightGray
        border: `1px solid ${theme.palette.border.gray3}`,
        color: "inherit",
        fontSize: `${props.fontSize ? props.fontSize : "15px"}`,
        fontWeight: "300",
        // width: "250px",
        borderRadius: `${props.borderRadius ? props.borderRadius : "6px"}`,
        transition: "all 0.4s ease",

        "& .MuiOutlinedInput-input": {
            paddingLeft: "24px",
        },
        "& .MuiOutlinedInput-inputMarginDense": {
            paddingTop: `${props.paddingVertical ? props.paddingVertical : null}`,
            paddingBottom: `${props.paddingVertical ? props.paddingVertical : null}`,
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
            // lightGray2
            color: theme.palette.border.gray3,
        },
        "& fieldset": {
            borderRadius: `${props.borderRadius ? props.borderRadius : "6px"}`,
            border: "none",
        },
    }),
    disabled: {
        color: theme.palette.text.disabled,
        background: theme.palette.background.hover,
        "&:hover": {
            background: theme.palette.background.hover,
            color: theme.palette.text.disabled,
        },
    },
    error: {
        borderColor: theme.palette.error.main,
        "&:focus-within": {
            borderColor: theme.palette.error.main,
        },
    },
    helperText: {
        color: theme.palette.error.main + " !important",
        fontSize: ".7rem !important",
    },
    helperTextForgotPassword: {
        fontSize: '.7rem',
        color: theme.palette.text.link_sec,
        textAlign: "right",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline"
        }
    }
}));
const TextInputField = ({
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
    formContainer,
    ...rest
}) => {
    const classes = useStyles(propStyles);
    return (
        <div
            className={isSearchField ? null : formContainer ? classes.formContainer : classes.container}
        >
            {label && (
                <InputLabel
                    className={classes.label}
                    // errors
                    // variant="standard"
                    htmlFor={name}
                >
                    {label}
                </InputLabel>
            )}
            <TextField
                name={name}
                // disableUnderline
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                variant="outlined"
                defaultValue={defaultValue}
                InputProps={{
                    classes: {
                        root: classes.root,
                        disabled: classes.disabled,
                        error: classes.error,
                    },
                    // disableUnderline: true,
                    startAdornment: icon && (
                        <InputAdornment position="start">{icon}</InputAdornment>
                    ),
                    endAdornment: endIcon && value.length > 0 && (
                        <InputAdornment position="end">{endIcon}</InputAdornment>
                    ),
                }}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                fullWidth
                required={required}
                error={error}
                helperText={error && errorText}
                autoFocus={autoFocus}
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                {...rest}
            />
            {forgotPasswordHelper &&
                <FormHelperText onClick={() => forgotPasswordCallback()} className={classes.helperTextForgotPassword}>Forgot password</FormHelperText>
            }
        </div>
    );
};

export default TextInputField;