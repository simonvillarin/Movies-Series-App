import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './GlobalStyles.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import SearchBar from './components/SearchBar.js';
import Trending from './pages/Trending.js';
import Movies from './pages/Movies.js';
import TVSeries from './pages/TVSeries.js';
import Movie from './pages/Movie.js';
import Series from './pages/Series.js';

function App() {
  return (
    <div className="App">
      <Router>
        <GlobalStyles />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvseries" element={<TVSeries />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/series/:id" element={<Series />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
