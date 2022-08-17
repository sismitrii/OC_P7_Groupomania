/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState, useEffect, useCallback } from "react";

function useFetch(url, startToLoad){
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async()=>{
        try {

            await setLoading(true);
            await setError(false);
            const res = await fetch(url)
            const dataToAdd = await res.json()
            console.log(dataToAdd)
            await setData(dataToAdd)
            setLoading(false);
        } catch (error) {
            setError(error)
        }
    },[url])

    useEffect(()=>{
       fetchData(url)
    },[url,fetchData, startToLoad])
    return {data, isLoading, error}
}

export default useFetch