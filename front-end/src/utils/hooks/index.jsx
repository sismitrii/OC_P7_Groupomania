/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState, useEffect, useCallback } from "react";

function useFetch(url){
    const [data, setData] = useState([]);

    const fetchData = useCallback(async()=>{
        try {

            const res = await fetch(url)
            const dataToAdd = await res.json()
            await setData(dataToAdd)
            
        } catch (error) {
        }
    },[url])

    useEffect(()=>{
       fetchData(url)
    },[url])
    return {data}
}

export default useFetch