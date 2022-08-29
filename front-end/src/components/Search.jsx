/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useContext, useState, useRef } from "react"
import { AppContext } from "../utils/context"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import SearchProfil from "./SearchProfil"

import { fetchPostOrPut } from "../utils/function/function"
/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/
const SearchContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: flex-end;
    flex: 1;
`
const SearchBloc = styled.div `
    position: absolute;
    top:${(props)=> props.isMobile ? "-77px" : "0" };
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(170, 170, 170, 0.9);
    z-index:1000;

    > form {
        margin: 0 auto;
        position: relative;
        max-width: 1000px;
        margin-top: 10px;
    }
`

const Close = styled.div`
    position: absolute;
    top:50%;
    left: 15px;
    transform: translateY(-50%);
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
`
const SearchInput = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid #9A9A9A;
    border-radius: 25px;
    padding-left: 35px;
    font-size: 18px;
    outline: none;
`
const SearchButton = styled.button`
    ${(props)=> props.isSearching ? `
    position: absolute;
    top:0;
    right: 1px;` :
    ""}
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
        ${(props)=> props.isMobile && `

        `}

    }
`
const SearchMobileBloc = styled.div`
    cursor: pointer;
    width: 100%;
    overflow: hidden;
    height: ${(props)=>(props.isOpen ) ? "45px": "0px"};
    padding: ${(props)=>(props.isOpen) ? "15px": "0px"};
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Search(props){
    const {isMobile, isSearching, setIsSearching} = useContext(AppContext)
    const [profils, setProfils] = useState([])
    const inputRef = useRef(null)

    /*=== On click open the input search===*/
    async function handleClick(){
        await setIsSearching(true);
        if(props.setIsOpen){
            await props.setIsOpen(false);
        }
        inputRef.current.focus();
    }

    async function handleSearch(e){
        e.preventDefault()
        const answer = await fetchPostOrPut("POST",{searchValue: inputRef.current.value}, 'http://localhost:3000/api/user/getUsers')
        setProfils(answer.users)
        // Plus qu'a créez les lien
    }

    return (
    <>
    {!isSearching ? 
        <>
            {isMobile ? 
            <SearchMobileBloc tabIndex={0} isOpen={props.isOpen} onClick={()=> handleClick()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                Recherchez
            </SearchMobileBloc>
            :
            <SearchContainer>
                <SearchButton onClick={()=> handleClick()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </SearchButton>
            </SearchContainer>
            }
        </>
        :
        <SearchBloc isMobile={isMobile}>
            <form>
                <Close onClick={()=> {setIsSearching(false);setProfils([])}}>X</Close>
                <SearchInput 
                    type="text"
                    id="search-bar" 
                    name="search-bar"
                    ref={inputRef}
                    aria-label="Recherchez des utilisateurs"
                    placeholder="Recherchez des utilisateurs"
                />
                <SearchButton onClick={(e)=> handleSearch(e)} isSearching={isSearching}>        
                    <FontAwesomeIcon 
                        icon={faMagnifyingGlass} />
                </SearchButton>
            </form>
            {profils && 
            <>
                {profils.map((profil)=>(
                    <SearchProfil 
                        key={profil._id} 
                        profil={profil}
                        setProfils={setProfils}
                    />
                ))}
            </>
            }
        </SearchBloc>
    }
    </>)
}

export default Search