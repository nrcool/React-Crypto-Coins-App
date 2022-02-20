import Carousel from "react-elastic-carousel";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext.js";
import { TrendingCoins } from "../config/api";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(() => ({
  carousal: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));
export default function Carousal() {
  const classes = useStyle();
  const { currency, symbol } = useContext(MyContext);
  console.log(currency, symbol);
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    const fetchTrendongCoins = async (currency) => {
      const res = await fetch(TrendingCoins(currency));
      const result = await res.json();
      console.log(result);
      setTrending(result);
    };
    fetchTrendongCoins(currency);
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carousalItem} to={`/coins/${coin.id}`}>
        <div>
          <img
            src={coin.image}
            height="80"
            style={{ marginBottom: 10 }}
            alt=""
          />
        </div>
        <span style={{ fontSize: 30 }}>
          {coin?.symbol}
          &nbsp;
        </span>
        <span
          style={{
            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
          }}
        >
          {profit && "+"}
          {coin?.price_change_percentage_24h?.toFixed(2)}%
        </span>
        <div>
          <span style={{ fontSize: 22, fontWeight: 500, color: "white" }}>
            {symbol} {coin?.current_price.toFixed(2)}
          </span>
        </div>
      </Link>
    );
  });
  return (
    <Carousel
    enableAutoPlay={true}
    autoPlaySpeed={2000}
      breakPoints={[
        { width: 420, itemsToShow: 1, itemsToScroll: 1 },
        { width: 520, itemsToShow: 2, itemsToScroll: 1 },
        { width: 620, itemsToShow: 3, itemsToScroll: 1 },
      ]}
    >
      {items}
    </Carousel>
  );
}
