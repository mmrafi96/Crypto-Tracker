import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react' 
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles((theme) => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const {currency, setCurrency, user } = CryptoState(Crypto);
    console.log(user?.email);
  return (
      <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static' >
        <Container>
            <Toolbar >
                <Typography onClick={()=> navigate("/")} className={classes.title}>MD Crypto Tracker</Typography>
                <Select variant='outlined' style={{width:100, height:40,marginRight:15}} value={currency} onChange={(e) => setCurrency(e.target.value)} >
                    <MenuItem value={"INR"}>INR</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                </Select>
                {user ? <UserSidebar/> : <AuthModal /> }
                
            </Toolbar>
        </Container>

    </AppBar>
    </ThemeProvider>
    )
}

export default Header