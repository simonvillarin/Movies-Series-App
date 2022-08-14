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

function Movie() {
  const [movie, setMovie] = useState([]);

  let params = useParams();

  const fetchMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await res.json();

      setMovie(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovie();
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
          <a href={movie.homepage}>
            <PosterWrapper>
              <Poster
                src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </PosterWrapper>
          </a>
          <Details>
            <DetailsWrapper>
              <Title>{movie.original_title}</Title>

              <OverviewTitle>Overview</OverviewTitle>
              <OverviewBody>{movie.overview}</OverviewBody>

              <SubDetails>
                <Box>
                  <TagLine>{`Tagline: ${
                    movie.tagline ? movie.tagline : 'none'
                  }`}</TagLine>
                  <Status>{`Status: ${movie.status}`}</Status>
                  <ReleaseDate>{`Release Date: ${movie.release_date}`}</ReleaseDate>
                  <RunTime>{`Runtime: ${
                    movie.runtime > 0 ? movie.runtime + ' mins' : 'not stated'
                  }`}</RunTime>
                </Box>
                <Box>
                  <VoteAverage>{`Vote Average: ${
                    movie.vote_average > 0
                      ? movie.vote_average.toFixed(1)
                      : 'none'
                  }`}</VoteAverage>
                  <VoteCount>{`Vote Count: ${
                    movie.vote_count > 0 ? movie.vote_count : 'none'
                  }`}</VoteCount>
                  <Budget>{`Budget: ${
                    movie.budget > 0
                      ? '$ ' + commafy(movie.budget)
                      : 'not stated'
                  }`}</Budget>
                  <Revenue>{`Revenue: ${
                    movie.revenue > 0
                      ? '$ ' + commafy(movie.revenue)
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

export default Movie;
