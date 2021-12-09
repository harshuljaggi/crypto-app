import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";

const CoinsDataTable = (props) => {
  const [selectedCoin, setSelectedCoin] = useState("");

  useEffect(() => {
    setSelectedCoin("");
  }, [props.resetTableSelection]);

  const handleTableRowClick = (coin) => {
    console.log(coin);
    setSelectedCoin(coin);
    props.onCoinSelect(coin);
  };

  return (
    <TableContainer component={Paper} style={{ maxHeight: props.height }}>
      <Table aria-label="coins table" stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Rank</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">Coin</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">Image</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1">Symbol</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle1">
                {"Price" + " - " + props.selectedCurrency.toUpperCase()}
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle1">%Change 1 Hour</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle1">%Change 1 Day</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle1">%Change 1 Week</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle1">
                {"Mkt Cap" + " - " + props.selectedCurrency.toUpperCase()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.coins.map((coin) => (
            <TableRow
              key={coin.name}
              onClick={() => handleTableRowClick(coin.id)}
              selected={coin.id === selectedCoin}
            >
              <TableCell align="left">
                <Typography>{coin.market_cap_rank}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{coin.name}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>
                  <img src={coin.image} height="15" alt="coin" />
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{coin.symbol.toUpperCase()}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{coin.current_price}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  style={{
                    color:
                      coin.price_change_percentage_1h_in_currency > 0
                        ? "#4eaf0a"
                        : "#e15241",
                  }}
                >
                  {(coin.price_change_percentage_1h_in_currency > 0
                    ? "+"
                    : "") +
                    parseFloat(
                      coin.price_change_percentage_1h_in_currency
                    ).toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  style={{
                    color:
                      coin.price_change_percentage_24h_in_currency > 0
                        ? "#4eaf0a"
                        : "#e15241",
                  }}
                >
                  {(coin.price_change_percentage_24h_in_currency > 0
                    ? "+"
                    : "") +
                    parseFloat(
                      coin.price_change_percentage_24h_in_currency
                    ).toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  style={{
                    color:
                      coin.price_change_percentage_7d_in_currency > 0
                        ? "#4eaf0a"
                        : "#e15241",
                  }}
                >
                  {(coin.price_change_percentage_7d_in_currency > 0
                    ? "+"
                    : "") +
                    parseFloat(
                      coin.price_change_percentage_7d_in_currency
                    ).toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{coin.market_cap}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoinsDataTable;
