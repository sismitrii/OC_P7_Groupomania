import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import styled from "styled-components"

const SearchContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: flex-end;
    flex: 1;
`

const SearchIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #DDDDDD;
    font-size: 22px;
    color: #9A9A9A;
    cursor: pointer;
`

const SearchForm = styled.form `
    position: relative;
    display : flex;
    justify-content : flex-end;
    width: 100%;
    height: 50px;
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: 1px solid #9A9A9A;
    border-radius : 25px;
    padding-left : 20px;
    font-size : 20px;
    outline: none;
`

const SearchButton = styled.button`
    position: absolute;
    border : none;
    outline : none;
    border-radius : 25px;
`


function Search(){
    const [isSearching, setIsSearching] = useState(false);

    async function handleClick(){
        await setIsSearching(true);
        document.getElementById('search-bar').focus()  
    }

    return (
    <>
    {window.matchMedia("(max-width:768px)").matches ? 
    <Link to="/Home"><FontAwesomeIcon icon={faMagnifyingGlass} />Recherchez</Link>
    :
    <SearchContainer>
        {isSearching ? 
        <SearchForm>
            <SearchInput onBlur={()=> setIsSearching(false)} type="text" id="search-bar" name="search-bar"/>
            <SearchButton>        
                <SearchIconContainer>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </SearchIconContainer>
            </SearchButton>
        </SearchForm>
        :
        <SearchIconContainer onClick={()=> handleClick()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchIconContainer>}
    </SearchContainer> }
    </>)
}

export default Search