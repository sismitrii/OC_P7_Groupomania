/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useState, useContext } from "react"
import { AppContext } from "../utils/context"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/
const SearchContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: flex-end;
    flex: 1;
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
    ${(props)=> props.isMobile ? 
        `position: relative;
        ;left: -50px;`
    : ''}
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: #DDDDDD;
    cursor: pointer;
    font-size: 22px;
    font-size: 22px;
    color: #9A9A9A;

    svg {
        display: inline;
        position: relative;
        top:0;
        left: 0;
        transform: none;
    }
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

    /*=== On click open the input search===*/
    async function handleClick(){
        await setIsSearching(true);
        await props.setIsOpen(false);
        document.getElementById('search-bar').focus()  
    }
    return (
    <>
    {isMobile ? 
    <>
        {!isSearching ? 
        <SearchMobileBloc tabIndex={0} $isOpen={props.$isOpen} onClick={()=> handleClick()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Recherchez
        </SearchMobileBloc>
        :
        <SearchForm $isMobile>
            <SearchInput 
                type="text"
                id="search-bar" 
                name="search-bar"
                aria-label="Recherchez des utilisateurs"
                placeholder="Recherchez des utilisateurs"
                onBlur={()=> setIsSearching(false)}
            />
            <SearchButton isMobile={isMobile}>        
                <FontAwesomeIcon 
                    className="search__icon" 
                    icon={faMagnifyingGlass} />
            </SearchButton>
        </SearchForm>
        }
    </>
    :
    <SearchContainer>
        {!isSearching ? 
            <SearchButton onClick={()=> handleClick()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </SearchButton>
        :
        <SearchForm>
            <SearchInput  
                type="text" 
                id="search-bar" 
                name="search-bar"
                aria-label="Recherchez des utilisateurs"
                placeholder="Recherchez des utilisateurs"
                onBlur={()=> setIsSearching(false)}
            />
            <SearchButton>        
                <FontAwesomeIcon 
                    className="search__icon" 
                    icon={faMagnifyingGlass} />
            </SearchButton>
        </SearchForm>
        }
    </SearchContainer> }
    </>)
}

export default Search