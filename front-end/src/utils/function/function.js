/*=== Request fetch de method GET ===*/
export async function fetchGet(url){
    if (!url){return}
    try {
        const res = await fetch(url)
        const answer = await res.json();
        return answer;
    } catch (error) {
        console.error(error);
    }
}

/*=== Request fetch PUT or POST setting header depending of type and authorization===*/
export async function fetchPostOrPut(method, dataToSend, url, dataConnection){
    try {
        const bearer = dataConnection ? "Bearer " + dataConnection.token : "";
        const dataToPost = dataToSend.image ? dataToSend.image : JSON.stringify(dataToSend)
        const header = dataToSend.image ? {
            'Accept': '/',
            'Authorization': bearer
        } :
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        }

        const res = await fetch(url,
        {
            method: method,
            headers: header,
            body: dataToPost
        })
            const answer = await res.json()
            return answer;
    } catch (error) {
        console.error("pass");
    }
}