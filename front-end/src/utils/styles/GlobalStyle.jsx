import { useContext } from 'react'
import { createGlobalStyle } from 'styled-components'
import { AppContext } from '../context'

import colors from './colors'

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

    h1 {
        font-size: 25px;
        font-weight: 500;
        margin: 20px;
    }

    input:focus {
        outline: none;
        box-shadow: 0px 0px 0px 1px ${colors.primary};
    }
`

function GlobalStyle(){
    const {modifIsOpen} = useContext(AppContext)
    return <StyledGlobalStyle modifIsOpen={modifIsOpen}/>
}

export default GlobalStyle