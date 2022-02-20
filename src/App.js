import { makeStyles } from "@material-ui/styles";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import CoinPage from "./components/CoinPage";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import CryptoContext from "./context/CryptoContext";


function App() {
  const useStyles = makeStyles((theme) => ({
    App: {
      backgroundColor:"#14161a",
      minHeight:"100vh",
      color:"white"
    },
  }));
  const classes=useStyles()
  return (
    <CryptoContext>
    <HashRouter>
      <div className={classes.App}>
        <Header/>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/coins/:id" element={<CoinPage/>}/>
        </Routes>
      </div>
    </HashRouter>
    </CryptoContext>
  );
}

export default App;
