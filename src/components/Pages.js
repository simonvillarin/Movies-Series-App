import React from 'react';
import Pagination from '@mui/material/Pagination';
import { Container } from '../GlobalStyles.js';
import styled from 'styled-components';

const PagesContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

function Pages({ setPage, numOfPages }) {
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    window.scroll(0, 0);
  };

  return (
    <>
      <PagesContainer>
        <Pagination
          count={numOfPages}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </PagesContainer>
    </>
  );
}

export default Pages;
