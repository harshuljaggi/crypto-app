import React from "react";
import Dashboard from "./components/dashboard";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

function App() {
  const menuTitle = "Crypto App";
  return (
    <Container maxWidth="xl">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">{menuTitle}</Typography>
        </Toolbar>
      </AppBar>
      <Dashboard />
    </Container>
  );
}

export default App;
