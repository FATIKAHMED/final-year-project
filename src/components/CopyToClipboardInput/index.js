import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
import { FaRegCopy } from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    padding: ".7rem",
    display: "flex",
    fontSize: "22px",
    cursor: "pointer",
    // darkPurple
    background: theme.palette.background.purple,
    color: "white",
    borderRadius: "0 8px 8px 0",
    padding: "0.7rem 1rem"
  },
}));

export default function CopyToClipboardInput({ refLink }) {
  const classes = useStyles();
  const theme = useTheme();
  const [copiedText, setCopiedText] = React.useState("");

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 400,
        boxShadow: "none",
        // darkPurple
        border: `1px solid ${theme.palette.background.purple}`,
        borderRadius: "10px",
      }}
    >
      <InputBase
        value={refLink}
        readOnly={true}
        sx={{ ml: 1, flex: 1, border: 0 }}
        placeholder="Referral Link"
        inputProps={{ "aria-label": "referral link" }}
      />
      <Divider orientation="vertical" color="inherit" flexItem />
      <CopyToClipboard text={refLink} onCopy={() => setCopiedText(refLink)}>
        <Tooltip
          title={copiedText === refLink ? "Copied!" : "Copy To Clipboard"}
          placement="top"
        >
          <div className={classes.iconContainer}>
            <FaRegCopy />
          </div>
        </Tooltip>
      </CopyToClipboard>
    </Paper>
  );
}
