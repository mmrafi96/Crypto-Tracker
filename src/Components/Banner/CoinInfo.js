import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import  { CryptoState } from '../../CryptoContext';
import { HistoricalChart } from '../../config/api';
import { Button, CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { chartDays } from '../../config/data';
import SelectButton from '../SelectButton';

const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
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
const CoinInfo = ({coin}) => {
const classes = useStyles();
const [history, setHistory] = useState();
const { currency } = CryptoState(Crypto);
const [days, setDays] = useState(1);
const [flag,setflag] = useState(false);
const fetchHistory = async () => {
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistory(data.prices);
}
 
useEffect(() => {
    fetchHistory()
}, [days,currency]);

  return (
<ThemeProvider theme={darkTheme}>
   <div className={classes.container}>
       { !history | flag === false ? (
           <CircularProgress style={{color:"gold"}} size={250} thickness={1}/>
       ) :(<>
                      <Line
              data={{
                labels: history.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: history.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div       style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
                {chartDays.map(day=> (
                    <SelectButton variant="outlined" variant="outlined" style={{color:"gold"}} onClick={(e)=> {setDays(day.value);setflag(false);}} selected={day.value === days}  >{day.label}</SelectButton>
                ))

                }
            </div>
       </>)

       }
       </div>
</ThemeProvider>  )
}

export default CoinInfo