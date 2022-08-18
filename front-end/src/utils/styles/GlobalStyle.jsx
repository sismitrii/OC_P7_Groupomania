import { createGlobalStyle } from 'styled-components'

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
    }

    a {
        text-decoration: none;
        color: black;
    }
`

function GlobalStyle(){
    return <StyledGlobalStyle />
}

export default GlobalStyle