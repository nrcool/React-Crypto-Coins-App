import { ThemeProvider,createTheme
 } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { MyContext } from './MyContext'
const darkTheme= createTheme({
    palette:{
        primary:{
            main:"#fff"
        },
        type:"dark"
    }
})
export default function CryptoContext({children}) {
    const [currency,setCurrency]=useState("USD")
    const [symbol,setSymbol]=useState("$")

  return (
      <ThemeProvider theme={darkTheme}> 
        <MyContext.Provider value={{currency,setCurrency,symbol,setSymbol}}>
                {children}
        </MyContext.Provider>
        </ThemeProvider>
  )
}
