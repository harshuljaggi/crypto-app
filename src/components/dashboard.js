import React, { useEffect, useState } from "react";
import { fetchResterData } from "./common/ajax";
import Links from "./common/links";
import Dropdown from "./UI/dropdown";
import CoinsDataTable from "./coinsdatatable";
import CoinsChart from "./coinschart";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

// Supported currency list , will be expanded in future
const CURRENCY_LIST = ["usd", "cny", "jpy", "inr"];

const totalCoins = 250;

// Default message text
const defaultMessage =
  "Please click on a coin from above table to see detailed information.";

const fetchCurrencyData = async (selectedCurrency, successCb, loadingCb) => {
  try {
    console.log("fetching table data.");
    loadingCb(true);
    const result = await fetchResterData(
      Links.getTableDataURL(selectedCurrency, totalCoins)
    );
    result && successCb(result);
    loadingCb(false);
  } catch (err) {
    console.log(err);
    loadingCb(false);
  }
};

const defaultCurrency = "usd";

const Dashboard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency); // start with USD currency selected
  const [selectedCoin, setSelectedCoin] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // flag to control table row selection
  const [resetTableSelection, setResetTableSelection] = useState(false);

  useEffect(() => {
    fetchCurrencyData(
      defaultCurrency,
      (result) => {
        setCoins(result);
        setFilteredCoins(result);
      },
      (loading) => setIsLoading(loading)
    );
  }, []);

  // handle currency dropdown change
  const handleCurrencyChange = (event) => {
    const selectedCurr = event.target.value;
    fetchCurrencyData(
      selectedCurr,
      (result) => {
        setCoins(result);
        setFilteredCoins(result);
      },
      (loading) => setIsLoading(loading)
    );
    setSelectedCurrency(selectedCurr);
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
    if (selectedCurrency !== defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
      fetchCurrencyData(
        defaultCurrency,
        (result) => {
          setCoins(result);
          setFilteredCoins(result);
        },
        (loading) => setIsLoading(loading)
      );
    }
    if (resetTableSelection === false) {
      setResetTableSelection(true);
    } else {
      setResetTableSelection(false);
    }
    setSelectedCoin("");
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        style={{ marginTop: "4rem", marginBottom: "2rem" }}
      >
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <TextField
            label={`Search in ${totalCoins} coins...`}
            variant="standard"
            margin="dense"
            onChange={handleSearchChange}
            value={searchText}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
          <Dropdown
            labelName={"Currency"}
            selected={selectedCurrency}
            handleChange={handleCurrencyChange}
            values={CURRENCY_LIST}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem", width: "100%" }}
            onClick={handleResetButtonClick}
          >
            Reset
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} direction="column">
        <Grid item style={{ width: "100%" }}>
          {isLoading && (
            <Skeleton variant="rect" height={300} animation="wave" />
          )}
          {!isLoading && (
            <CoinsDataTable
              coins={filteredCoins}
              onCoinSelect={setSelectedCoin}
              resetTableSelection={resetTableSelection}
              selectedCurrency={selectedCurrency}
              height={290}
            />
          )}
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          style={{ maxWidth: "97%", overflow: "auto" }}
        >
          {selectedCoin !== "" && (
            <CoinsChart
              selectedCurrency={selectedCurrency}
              selectedCoin={selectedCoin}
              chartHeight={350}
              chartWidth={600}
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
