import React, { useEffect, useState } from "react";
import { fetchResterData } from "./common/ajax";
import Links from "./common/links";
import Dropdown from "./UI/dropdown";
import CoinsDataTable from "./coinsdatatable";
import CoinsChart from "./coinschart";
import { Grid, Typography, TextField, Button } from "@material-ui/core";

// Supported currency list , will be expanded in future
const CURRENCY_LIST = ["usd", "cny", "jpy", "inr"];

// Default message text
const defaultMessage =
  "Please click on a coin from above table to see detailed information.";

const Dashboard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("usd"); // start with USD currency selected
  const [selectedCoin, setSelectedCoin] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchText, setSearchText] = useState("");

  // flag to control table row selection
  const [resetTableSelection, setResetTableSelection] = useState(false);

  useEffect(() => {
    const init = async () => {
      console.log("fetching table data.");
      const result = await fetchResterData(
        Links.getTableDataURL(selectedCurrency, 100)
      );
      if (result) {
        setCoins(result);
        setFilteredCoins(result);
      }
    };
    init();
  }, [selectedCurrency]);

  // handle currency dropdown change
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  // handle search coin text field change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if (event.target.value !== "") {
      const coinsFilterered = coins.filter((coin) =>
        coin["id"].includes(event.target.value.toLowerCase())
      );
      setFilteredCoins(coinsFilterered);
    } else {
      setFilteredCoins(coins);
    }
  };

  // handle Reset button click
  const handleResetButtonClick = (event) => {
    setSearchText("");
    setFilteredCoins(coins);
    setSelectedCurrency("usd");
    if (resetTableSelection === false) {
      setResetTableSelection(true);
    } else {
      setResetTableSelection(false);
    }
    setSelectedCoin("");
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} style={{marginTop: "4rem"}}>
        <Grid item xl={2} lg={2} md={3} sm={3} xs={4}>
          <TextField
            label="Search coin"
            variant="standard"
            margin="dense"
            onChange={handleSearchChange}
            value={searchText}
          />
        </Grid>
        <Grid item xl={1} lg={1} md={2} sm={3} xs={3}>
          <Dropdown
            labelName={"Currency"}
            selected={selectedCurrency}
            handleChange={handleCurrencyChange}
            values={CURRENCY_LIST}
          />
        </Grid>
        <Grid item xl={1} lg={2} md={2} sm={3} xs={3}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            onClick={handleResetButtonClick}
          >
            Reset
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} direction="column">
        <Grid item>
          <CoinsDataTable
            coins={filteredCoins}
            onCoinSelect={setSelectedCoin}
            resetTableSelection={resetTableSelection}
            selectedCurrency={selectedCurrency}
            height={225}
          />
        </Grid>
        <Grid item>
          {selectedCoin !== "" && (
            <CoinsChart
              selectedCurrency={selectedCurrency}
              selectedCoin={selectedCoin}
              chartHeight={350}
              chartWidth={700}
            />
          )}
          {selectedCoin === "" && (
            <Typography variant="body1">{defaultMessage}</Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
