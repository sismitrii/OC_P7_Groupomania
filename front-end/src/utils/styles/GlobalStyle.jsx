import { useContext } from 'react'
import { createGlobalStyle } from 'styled-components'
import { AppContext } from '../context'

const StyledGlobalStyle = createGlobalStyle`
    *,
    ::before,
    ::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    body {
        font-family: 'Raleway','Arial', sans-serif;
        overflow: ${(props)=> props.modifIsOpen ? "hidden" : "visible"}
    }

    a {
        text-decoration: none;
        color: black;
    }
`

function GlobalStyle(){
    const {modifIsOpen} = useContext(AppContext)
    return <StyledGlobalStyle modifIsOpen={modifIsOpen}/>
}

export default GlobalStyle