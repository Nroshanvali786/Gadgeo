import axios from "axios";
import { AwardIcon } from "lucide-react";
import { createContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const[data, setData] = useState();

    const fetchAllProducts = async () => {
        try {
            const res = await axios.get()
        } catch (error) {
            console.log(error);
            
        }
    }
    return <DataContext.Provider value={{data, setData, fetchAllProducts}}>
        {children}
    </DataContext.Provider>
}