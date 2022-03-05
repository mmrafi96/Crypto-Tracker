import './App.css';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';
import Alert from './Components/Authentication/Alert';
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}> 
    <Header /> 
      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/coins/:id' element={<CoinPage/>} />
      </Routes>
      <Alert/>
    </div>
  );
}

export default App;
