/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import styled from "styled-components"
import { useContext } from "react"
import { AppContext } from "../utils/context"

/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

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
    position: ${(props)=> props.$isMobile ? "absolute": "relative"};
    display: flex;
    justify-content: flex-end;
    width: ${(props)=> props.$isMobile ? " 80%" : "100%"};
    height: 50px;

    ${(props)=> props.$isMobile ? 
        `top: 50px;
        left: 50%;
        transform: translate(-50%);`
    :
         ""}

    .search__icon {
        display: inline;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%)
    }
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: 1px solid #9A9A9A;
    border-radius: 25px;
    padding-left: 20px;
    font-size: 20px;
    outline: none;
`

const SearchButton = styled.button`
    position: absolute;
    border: none;
    outline: none;
    border-radius: 25px;
`

const SearchMobileBloc = styled.div`
    cursor: pointer;
    width: 100%;
    overflow: hidden;
    height: ${(props)=>(props.$isOpen ) ? "45px": "0px"};
    padding: ${(props)=>(props.$isOpen) ? "15px": "0px"};
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function Search(props){
    const [isSearching, setIsSearching] = useState(false);
    const {isMobile} = useContext(AppContext)

    async function handleClick(){
        await setIsSearching(true);
        await props.setIsOpen(false);
        document.getElementById('search-bar').focus()  
    }

    return (
    <>
    {isMobile ? 
    <>
        {isSearching ? 
            <SearchForm $isMobile>
                    <SearchInput 
                        type="text"
                        id="search-bar" 
                        name="search-bar"
                        onBlur={()=> setIsSearching(false)}
                    />
                    <SearchButton>        
                        <SearchIconContainer>
                            <FontAwesomeIcon 
                                className="search__icon" 
                                icon={faMagnifyingGlass} />
                        </SearchIconContainer>
                    </SearchButton>
            </SearchForm>
        :
            <SearchMobileBloc $isOpen={props.$isOpen} onClick={()=> handleClick()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                Recherchez
            </SearchMobileBloc>
        }
    </>
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