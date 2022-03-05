import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CryptoState } from '../../CryptoContext';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setAlert} = CryptoState();

    const handleSubmit = async () => {
      if (!email | !password) {
          setAlert({
              open:true,
              message:'Please fill All fields',
              type:"error"
          });
          return;  
      }
      try {
     const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result);
        setAlert({
          open:true,
          message:`Login Successful. Welcome ${email}`,
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
    <div>
                <Box
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
      <Button
        variant="contained"
        size="large"
         onClick={handleSubmit}
        style={{ backgroundColor: "#EEBC1D" }}
      >
        Login
      </Button>
    </Box>
    </div>
  )
}

export default Login