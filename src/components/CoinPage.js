import { LinearProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {SingleCoin} from "../config/api"
import { MyContext } from '../context/MyContext'
import CoinInfo from './CoinInfo'
import { numberWithCommas } from './CoinsTable'
import ReactHtmlParser from 'react-html-parser';
 

export default function CoinPage() {
  const useStyle = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));
  const {id}= useParams()

  const {currency,symbol}=useContext(MyContext)
const [coin,setCoin]=useState()

  const fetchCoinData=async (id)=>{
    const {data} = await axios.get(SingleCoin(id))
    /* console.log(data) */
    setCoin(data)
  } 
  useEffect(()=>{
    fetchCoinData(id)
  },[])

  const classes = useStyle()

  if(!coin){
    return(<LinearProgress style={{backgroundColor:"gold"}}></LinearProgress>)
  }
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
         <img src={coin?.image.large} height="200" style={{marginBottom:20}} alt="" /> 
         <Typography variant="h3" className={classes.heading}>
            {coin?.name}
         </Typography>
         <Typography variant="subtitle1" className={classes.description}
         >
         {ReactHtmlParser(coin?.description.en.split(". ")[0])}
         </Typography>
         <div className={classes.marketData}>
         <Typography variant="h5" style={{
             fontFamily: "Montserrat",
         }}>Rank :<span style={{color:"gold"}}> {coin?.market_cap_rank} </span></Typography>
        <Typography variant="h5" style={{
             fontFamily: "Montserrat",
         }}>Current Price : <span style={{color:"gold"}}>{symbol}{" "}{} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])} </span></Typography> 
         <Typography variant="h5" style={{
             fontFamily: "Montserrat",
         }}>Market Cap : <span style={{color:"gold"}}>{symbol}{" "}{} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]).toString().slice(0.-6)} </span></Typography>
          </div>
      </div>
      <div ><CoinInfo coin={coin}/></div>
    </div>
  )
}
