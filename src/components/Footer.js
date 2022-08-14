import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  color: rgb(255, 255, 255);
  background-color: rgb(3, 37, 65);
`;

function Footer() {
  return (
    <>
      <FooterContainer>© TMDB. All Rights Reserved.</FooterContainer>
    </>
  );
}

export default Footer;
