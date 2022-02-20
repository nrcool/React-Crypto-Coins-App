import React, { useContext } from 'react'
import {AppBar,Container, MenuItem, Select, Toolbar, Typography,InputLabel} from "@material-ui/core"
import { makeStyles } from '@material-ui/styles'
import { useNavigate } from 'react-router'
import { MyContext } from '../context/MyContext'

const useStyles= makeStyles(()=>({
    title: {
        flex:1,
        color:"gold",
        fontFamily:"Montserrat",
        cursor:"pointer",
        fontWeight:"bold",

    }
}))

export default function Header() {
    const classes=useStyles()
    const navigate= useNavigate()

    const {currency,setCurrency,setSymbol}=useContext(MyContext)

  
  return (
 
    <AppBar color="transparent" position="static">
        <Container>
            <Toolbar>
                <Typography onClick={()=>navigate("/")} className={classes.title}>Crypto Coins</Typography>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>

               <Select labelId="demo-simple-select-label" value={currency} variant="outlined"  style={{width:100,height:40,marginLeft:15,color:"gold"}} onChange={(e)=>{
                   setCurrency(e.target.value)
                   if(e.target.value==="USD"){
                    setSymbol("$")
                }else{
                    setSymbol("€")
                }
                   }}>
                    <MenuItem value="USD">US</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                </Select> 
            </Toolbar>
        </Container>
    </AppBar>
   
  )
}
