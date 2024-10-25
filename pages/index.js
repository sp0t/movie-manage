import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MovieCard from '../components/movieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [currentMovies, setCurrentMovies] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [moviesPerPage, setMoviesPerPage] = useState(8);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchMovies();
    }

    const updateMoviesPerPage = () => {
      if (window.innerWidth < 768) {
        setMoviesPerPage(6); 
      } else {
        setMoviesPerPage(8);
      }
    };

    updateMoviesPerPage();
    window.addEventListener('resize', updateMoviesPerPage);

    return () => {
      window.removeEventListener('resize', updateMoviesPerPage);
    };
  }, []);

  useEffect(() => {
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.year.toString().includes(searchTerm)
    );

    setFilteredMovies(results);
  }, [searchTerm, movies]);

  useEffect(() => {
    var indexOfLastMovie = currentPage * moviesPerPage;
    var indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    var movies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    setCurrentMovies(movies);
  }, [filteredMovies, currentPage, moviesPerPage]);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
        var indexOfLastMovie = currentPage * moviesPerPage;
        var indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
        var movies = data.slice(indexOfFirstMovie, indexOfLastMovie);
        setCurrentMovies(movies);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleAddMovie = () => {
    router.push('/movies/create');
  };

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (movieId) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div className="relative min-h-screen p-8 bg-page-bg flex flex-col items-center">
      {movies.length > 0 ? (
        <div className="max-w-6xl w-full mx-auto mt-10">
          <div className="flex justify-between items-center mb-6 w-full">
            <div className="flex items-center">
              <h2 className="text-2xl md:text-4xl font-semibold mr-2 text-white">My Movies</h2>
              <button onClick={handleAddMovie}>
                <img
                  src="/add_plus.png"
                  alt="Add Icon"
                  className="w-5 h-5 shadow-xl hover:shadow-md rounded-full transition-all duration-200 ease-in-out"
                />
              </button>
            </div>

            <button
              className="flex items-center space-x-2 text-white"
              onClick={handleSignOut}
            >
              <span>Logout</span>
              <img
                src="/log_out.png"
                alt="Logout Icon"
                className="w-5 h-5 shadow-xl hover:shadow-md transition-all"
              />
            </button>
          </div>

          <div className="w-full mb-6">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border text-white rounded-md focus:ring focus:ring-indigo-300 bg-input-bg"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center mx-auto">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                title={movie.title}
                year={movie.year}
                poster={movie.poster}
                className="bg-white shadow-lg rounded-lg"
                onClick={() => handleCardClick(movie._id)}
              />
            ))}
          </div>

          {filteredMovies.length > moviesPerPage && (
            <div className="mt-8 flex justify-center items-center space-x-4 text-white">
              <span
                onClick={() => handlePageChange(currentPage - 1)}
                className={`cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
              >
                Prev
              </span>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 mx-1 ${
                    currentPage === page ? 'bg-button-100 hover:bg-button-200 text-white' : 'bg-card-bg text-white'
                  } rounded hover:bg-button-200`}
                >
                  {page}
                </button>
              ))}
              <span
                onClick={() => handlePageChange(currentPage + 1)}
                className={`cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                style={{ pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}
              >
                Next
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-white">Your movie list is empty</h2>
          <button
            onClick={handleAddMovie}
            className="block w-[200px] h-[54px] bg-button-100 text-white p-2 rounded-md hover:bg-button-200 transition font-bold text-base"
          >
            Add a New Movie
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
