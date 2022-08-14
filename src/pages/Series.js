import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../GlobalStyles.js';
import styled from 'styled-components';

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  place-items: center;
  gap: 1.5rem;
  margin-bottom: 4rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 40% 1fr;
  }
`;

const PosterWrapper = styled.div`
  height: 500px;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
`;

const DetailsWrapper = styled.div``;

const Title = styled.h2`
  font-size: clamp(1.51rem, calc(1.34rem + 0.86vw), 1.95rem);
  font-weight: 500;
  color: #121212;
  margin-bottom: 2rem;
`;

const OverviewTitle = styled.h4`
  font-size: clamp(1.05rem, calc(0.97rem + 0.39vw), 1.25rem);
  font-weight: 500;
  color: #121212;
  margin-bottom: 1rem;
`;

const OverviewBody = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
  margin-bottom: 2rem;
`;

const SubDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TagLine = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
`;

const Status = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
`;

const ReleaseDate = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
`;

const RunTime = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
`;

const VoteAverage = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
`;

const VoteCount = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
`;

const Budget = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
`;

const Revenue = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
`;

function Series() {
  const [series, setSeries] = useState([]);

  let params = useParams();

  const fetchSeries = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();

      setSeries(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, [params.id]);

  const commafy = (num) => {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  };

  return (
    <>
      <Container>
        <MovieContainer>
          <a href={series.homepage}>
            <PosterWrapper>
              <Poster
                src={`http://image.tmdb.org/t/p/original/${series.poster_path}`}
              />
            </PosterWrapper>
          </a>
          <Details>
            <DetailsWrapper>
              <Title>{series.original_title}</Title>
              <OverviewTitle>Overview</OverviewTitle>
              <OverviewBody>{series.overview}</OverviewBody>

              <SubDetails>
                <Box>
                  <TagLine>{`Tagline: ${
                    series.tagline ? series.tagline : 'none'
                  }`}</TagLine>
                  <Status>{`Status: ${series.status}`}</Status>
                  <ReleaseDate>{`Release Date: ${
                    series.first_air_date || series.release_date
                  }`}</ReleaseDate>
                  <RunTime>{`Runtime: ${
                    series.runtime > 0 ? series.runtime + ' mins' : 'not stated'
                  }`}</RunTime>
                </Box>
                <Box>
                  <VoteAverage>{`Vote Average: ${
                    series.vote_average > 0
                      ? series.vote_average.toFixed(1)
                      : 'none'
                  }`}</VoteAverage>
                  <VoteCount>{`Vote Count: ${
                    series.vote_count > 0 ? series.vote_count : 'none'
                  }`}</VoteCount>
                  <Budget>{`Budget: ${
                    series.budget > 0
                      ? '$ ' + commafy(series.budget)
                      : 'not stated'
                  }`}</Budget>
                  <Revenue>{`Revenue: ${
                    series.revenue > 0
                      ? '$ ' + commafy(series.revenue)
                      : 'not stated'
                  }`}</Revenue>
                </Box>
              </SubDetails>
            </DetailsWrapper>
          </Details>
        </MovieContainer>
      </Container>
    </>
  );
}

export default Series;
