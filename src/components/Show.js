import React from 'react';
import styled from 'styled-components';
import Badge from '@mui/material/Badge';

const Card = styled.div`
  display: block;
`;

const CardImage = styled.div`
  height: 380px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const CardPoster = styled.img`
  width: 100%;
  height: 100%;
`;

const CardBody = styled.div``;

const CardTitle = styled.h3`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  font-weight: 600;
  color: #121212;
`;

const CardDate = styled.div`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: rgb(221, 180, 102);
`;

function Show({ poster, title, date, vote }) {
  return (
    <>
      <Badge
        badgeContent={vote > 0 ? vote.toFixed(1) : '0'}
        color={vote > 6 ? 'primary' : 'error'}
      >
        <Card>
          <CardImage>
            <CardPoster src={poster} />
          </CardImage>
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardDate>{date}</CardDate>
          </CardBody>
        </Card>
      </Badge>
    </>
  );
}

export default Show;
