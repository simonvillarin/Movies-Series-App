import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'Poppins', sans-serif;
        line-height: 1.5;
        color: #121212;
        background-color: #ffffff;
    }

    img{
        max-width: 100%;
        height: auto;
    }

    ul{
        list-style-type: none;
    }
    
    a{
        text-decoration: none;
        cursor: pointer;
    }

    input, button{
        outline: none;
    }

    button{
        border: none;
        background-color: transparent;
    }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media screen and (min-width: 576px) {
    max-width: 540px;
  }

  @media screen and (min-width: 768px) {
    max-width: 720px;
  }

  @media screen and (min-width: 992px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
`;
