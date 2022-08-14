import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../GlobalStyles.js';
import Logo from '../assets/Logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(3, 37, 65);
  z-index: 100;
`;

const NavContainer = styled(Container)`
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 768px) {
    height: 4rem;
  }
`;

const NavBrand = styled.img`
  width: 10rem;
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 3.5rem;
    left: 0;
    width: 100%;
    display: ${(props) => (props.menu ? 'flex' : 'none')};
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    background-color: rgb(3, 37, 65);
    z-index: 100;
  }
`;

const NavLink = styled(Link)`
  color: rgb(255, 255, 255);

  &:hover:not(nth-of-type(1)) {
    color: #ddd;
  }

  &:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NavToggle = styled.div`
  display: none;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const IconMenu = styled(MenuIcon)`
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
`;

const IconClose = styled(CloseIcon)`
  font-size: 1.5rem;
  color: rgb(255, 255, 255);
`;

function Navbar() {
  const [menu, setMenu] = useState(false);

  const links = [
    {
      name: 'Home',
      location: '/',
    },
    {
      name: 'Movies',
      location: '/movies',
    },
    {
      name: 'TV Series',
      location: '/tvseries',
    },
  ];

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <NavLink to="/">
            <NavBrand src={Logo} alt="Logo" />
          </NavLink>

          <NavToggle onClick={handleMenu}>
            {menu ? <IconClose /> : <IconMenu />}
          </NavToggle>

          <NavMenu menu={menu}>
            {links.map((link, index) => (
              <NavLink
                to={link.location}
                key={index}
                onClick={() => setMenu(!menu)}
              >
                {link.name}
              </NavLink>
            ))}
          </NavMenu>
        </NavContainer>
      </Nav>
    </>
  );
}

export default Navbar;
