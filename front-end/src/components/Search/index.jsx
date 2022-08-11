import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import styled from "styled-components"

const SearchContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content : flex-end;
    border: 1px solid black;
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


function Search(){
    const [isSearching, setIsSearching] = useState(false)
    return (
    <>
    {window.matchMedia("(max-width:768px)").matches ? 
    <Link to="/Home"><FontAwesomeIcon icon={faMagnifyingGlass} />Recherchez</Link>
    :
    <SearchContainer>
        {isSearching ? 
        <form>
            <input type="text" id="search-bar" name="search-bar"/>
            <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
        :
        <SearchIconContainer>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchIconContainer>}
    </SearchContainer> }
    </>)
}

export default Search