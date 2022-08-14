import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../GlobalStyles.js';
import styled from 'styled-components';
import Show from '../components/Show.js';
import Pages from '../components/Pages.js';

const Title = styled.h2`
  font-size: clamp(1.44rem, calc(1.39rem + 0.24vw), 1.56rem);
  font-weight: 400;
  color: #121212;
  margin-bottom: 2.5rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  place-items: center;
  grid-gap: 2rem;

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

function TVSeries() {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);

  const fetchTrending = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      const data = await res.json();

      setSeries(data.results);
      setNumOfPages(data.total_pages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <>
      <Container>
        <Title>Popular TV Series</Title>
        <CardContainer>
          {series.map((show) => (
            <Link to={`/series/${show.id}`}>
              <Show
                key={show.id}
                poster={
                  show.poster_path
                    ? `http://image.tmdb.org/t/p/original/${show.poster_path}`
                    : 'https://www.movienewz.com/img/films/poster-holder.jpg'
                }
                title={show.title || show.name}
                date={show.release_date || show.first_air_date}
                vote={show.vote_average}
              />
            </Link>
          ))}
        </CardContainer>
        <Pages setPage={setPage} numOfPages={numOfPages} />
      </Container>
    </>
  );
}

export default TVSeries;
