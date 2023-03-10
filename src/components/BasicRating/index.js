import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating({ value, setValue }) {
    // const [value, setValue] = React.useState(0);
    //    React.useEffect(() => {
    //        onRatingChange()
    //    }, [value])
    return (
        <Box
            sx={{
                "& > legend": { mt: 2 },
                "& .MuiRating-root": { mb: 2 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Typography component="legend">Leave a rating</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    );
}
