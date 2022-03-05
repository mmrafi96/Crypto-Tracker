import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {setAlert} = CryptoState();
  const handleSubmit = async () => {
      if (password !== confirmPassword) {
          setAlert({
              open:true,
              message:'Password do not Match',
              type:"error"
          });
          return;  
      }
      try {
     const result = await createUserWithEmailAndPassword(auth, email, password);
        console.log(result);
        setAlert({
          open:true,
          message:'Sign Up Successful. Welcome',
          type:"Success"
      });
      } catch (error) {
          console.log(error.message);
          setAlert({
            open:true,
            message:error.message,
            type:"error"
        });
      }
  }
  return (
    <div>    <Box
    p={3}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    <TextField
      variant="outlined"
      type="email"
      label="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
    />
    <TextField
      variant="outlined"
      label="Enter Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
    />
    <TextField
      variant="outlined"
      label="Enter Confirm Password"
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      fullWidth
    />
    <Button
      variant="contained"
      size="large"
      onClick={handleSubmit}
      style={{ backgroundColor: "#EEBC1D" }}
    >
      Sign Up
    </Button>
  </Box></div>
  )
}

export default SignUp