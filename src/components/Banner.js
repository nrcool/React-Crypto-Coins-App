import { Container ,Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Carousal from './Carousal'
/* import banner from "../images/banner.jpg" */
const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage:"url(./banner.gif)",
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around"
    },
    tagline:{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center"
    }
}))
export default function Banner() {
    const classes = useStyles()
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
            <Typography variant="h2" style={{
                fontWeight:"bold",
                marginBottom:5,
                fontFamily:"Montserrat"
            }}>
                    Crypto Coins
            </Typography>
            <Typography variant="subtitle2" style={{
                color:"darkgray",
                textTransform:"capitalize",
                fontFamily:"Montserrat"
            }}>
                   Get current updates on crypto coins
            </Typography>
            <Carousal classname={classes.tagline}/>
            </div>
        </Container>
    </div>
  )
}
