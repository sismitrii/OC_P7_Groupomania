/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState, useEffect } from "react";

function useFetch(url){
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        if(!url){return}
        setLoading(true);
        setError(false);

        async function fetchData(){
            try {
                const res = await fetch(url)
                const dataToAdd = await res.json();
                await setData((prevData)=> [...prevData, dataToAdd.publicationToReturn])
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    },[url])
    return {data, isLoading, error}
}

export default useFetch