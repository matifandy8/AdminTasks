"use client"
import React, { createContext } from "react"

const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
}

export { GlobalProvider }
export default GlobalContext