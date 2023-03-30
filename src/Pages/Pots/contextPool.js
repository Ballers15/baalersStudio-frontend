import { useState, createContext, useContext } from 'react'


const PoolContext = createContext(null);


export const PotContextProvider = ({children}) => {

const [leaderBoardDetails,setLeaderBoardDetails] = useState("hello");
  


  return (
    <PoolContext.Provider value={{ leaderBoardDetails, setLeaderBoardDetails }}>
        {children}
    </PoolContext.Provider>
  )
}

export const usePool = () => {
  return useContext(PoolContext)
}

