async function fetchGet(url){
    if (!url){return}
    try {
        const res = await fetch(url)
        const answer = await res.json();
        return answer;
    } catch (error) {
        
    }
}

export default fetchGet