import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import { CryptoState } from "../../CryptoContext";
const Alert = () => {
  const {alert, setAlert} = CryptoState();

 
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };
  return (
    <div> 
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert onClose={handleClose} elevation={10} variant="filled" severity={alert.type}>{alert.message}</MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Alert;
