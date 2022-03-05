import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  tableHead: {
    color: "black",
    fontWeight: "700",
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
const CoinsTable = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
 
  const [page, setPage] = useState("1");
  const { currency, symbol, loading, coins ,setCoins,setLoading  ,fetchCoins} = CryptoState(Crypto);

  const filteredCoins =  () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
 // console.log(filteredCoins());
  useEffect(() => {
    fetchCoins(currency);
  }, [currency]);
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Monteserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Cryptocurrency"
          variant="outlined"
          style={{ width: "100%", marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table   aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow >
                  <TableCell className={classes.tableHead}>Coin</TableCell>
                  <TableCell className={classes.tableHead} align="right">
                    Price
                  </TableCell>
                  <TableCell  className={classes.tableHead} align="right">
                    24h Change
                  </TableCell>
                  <TableCell className={classes.tableHead} align="right">
                    Market Cap
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins()
                   .slice((page-1)*10, (page-1)*10 +10)
                .map((coin) => {
                  let profit = coin.price_change_percentage_24h >= 0;
                  return (
                    <TableRow className={classes.row} key={coin.id}>
                       <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={coin?.image}
                            alt={coin.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {coin.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {coin.name}
                            </span>
                          </div>
                        </TableCell>
                      <TableCell align="right">
                        {millify(coin.current_price)}{" "}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}{" "}
                        {coin.price_change_percentage_24h.toFixed(2)}%{" "}
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{millify(coin.market_cap)}{" "}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(filteredCoins()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
