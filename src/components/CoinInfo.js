import axios from 'axios'
import React, { useContext, useEffect,useState } from 'react'
import { HistoricalChart } from '../config/api'
import { chartDays } from '../config/data'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line }            from 'react-chartjs-2'
import { MyContext } from '../context/MyContext'
import {
    CircularProgress,
    makeStyles,
  } from "@material-ui/core";
  import SelectButton from "./SelectButton";


export default function CoinInfo({coin}) {
   
    const useStyles = makeStyles((theme) => ({
        container: {
          width: "70vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
          [theme.breakpoints.down("md")]: {
            width: "90vw",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
          }
        },
      }));
      const classes = useStyles();
    

    const [history,setHistory]=useState([])
    const [days,setDays]=useState(1)
    const [flag,setflag] = useState(false);

const {currency} =useContext(MyContext)
    const gethistoricalData=async(id,days,currency)=>{
        const {data}= await axios.get( HistoricalChart(id,days="365", currency))
        console.log(data)
        setflag(true)
        setHistory(data.prices)
      
    }
   
    useEffect(()=>{
        gethistoricalData(coin.id,days,currency)
    },[days,currency,coin.id])
  return (
      <div className={classes.container}>
        {!history | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
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
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
  )
}
