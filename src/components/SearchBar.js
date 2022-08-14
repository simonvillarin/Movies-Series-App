import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../GlobalStyles.js';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6rem auto 3rem;

  @media (min-width: 768px) {
    margin: 8rem auto 5rem;
  }
`;

const Search = styled.form`
  width: 100%;
  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr 4rem;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.75rem 2.25rem 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #c4c4c4;
  border-radius: 0.25rem 0 0 0.25rem;

  &:focus,
  &:hover {
    border: 1px solid rgb(3, 37, 65);
  }
`;

const IconSearchWrapper = styled.div`
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(3, 37, 65);
  border-radius: 0 0.25rem 0.25rem 0;
`;

const IconSearch = styled(SearchIcon)`
  color: rgb(255, 255, 255);
`;

const IconClose = styled(CloseIcon)`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  color: rgb(44, 44, 44);
`;

const Results = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border: 1px solid #c4c4c4;
  z-index: 10;
  overflow-y: auto;
`;

const Result = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #dddddd;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ResultPoster = styled.img`
  width: 3rem;
  height: 4rem;
`;

const ResultBody = styled.p`
  font-size: clamp(0.88rem, calc(0.83rem + 0.24vw), 1rem);
  color: #121212;
`;

function SearchBar() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchTrending = async () => {
    try {
      const res = await fetch(
        `
        https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}`
      );
      const data = await res.json();

      setMovies(data.results);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch('');
  };

  return (
    <>
      <SearchContainer>
        <Search>
          <SearchWrapper>
            <SearchInput
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
            {search && <IconClose onClick={handleClear} />}
            {movies && (
              <Results>
                {movies.map((movie) => (
                  <Link to={`movie/${movie.id}`}>
                    <Result key={movie.id} onClick={() => setSearch('')}>
                      <Box>
                        <ResultPoster
                          src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        />
                        <ResultBody>{movie.title || movie.name}</ResultBody>
                      </Box>
                      <Box>
                        <ResultBody>{movie.vote_average.toFixed(1)}</ResultBody>
                      </Box>
                    </Result>
                  </Link>
                ))}
              </Results>
            )}
          </SearchWrapper>
          <IconSearchWrapper>
            <IconSearch />
          </IconSearchWrapper>
        </Search>
      </SearchContainer>
    </>
  );
}

export default SearchBar;
