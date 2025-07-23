import {  createContext, useContext } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'


axios.defaults.baseURL=import.meta.env.VITE_BASE_URL

export const AppContext= createContext();

export const AppProvider=({children})=>{
    const value={

    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    return useContext(AppContext)
}