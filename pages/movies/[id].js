import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const UpdateMovie = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [existingPoster, setExistingPoster] = useState(null); // Poster from the movie
  const router = useRouter();
  const { id } = router.query; 

  useEffect(() => {
    if (id) {
      fetchMovieData(id);
    }
  }, [id]);

  const fetchMovieData = async (id) => {
    try {
      const response = await fetch(`/api/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTitle(data.title);
        setYear(data.year);
        setExistingPoster(data.poster);
      } else {
        console.error('Failed to fetch movie data:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      title,
      year
    };

    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(movieData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Error updating movie:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen p-2 md:p-8 bg-page-bg flex flex-col items-center justify-center">
      <div className="p-10 bg-page-bg flex flex-col w-full max-w-7xl">
        <h2 className="text-2xl sm:ml-12 sm:text-4xl md:text-5xl font-semibold mb-8 md:mb-16 text-white text-center md:text-left">
          Edit Movie
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-12 items-start space-y-6 md:space-y-0">
            <div className="flex flex-col space-y-2 block md:hidden w-full">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-[45px] p-2 border rounded-md focus:ring focus:ring-indigo-300 text-white bg-input-bg"
                placeholder="Title"
                required
              />
            </div>
            <div className="flex flex-col space-y-2 block md:hidden w-full">
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-[45px] p-2 border rounded-md focus:ring focus:ring-indigo-300 text-white bg-input-bg"
                placeholder="Publishing year"
                required
              />
            </div>
          <div className="w-full max-w-lg md:w-[473px] h-[400px] border-2 border-gray-300 rounded-md flex items-center justify-center">
            {existingPoster ? (
              <img
                src={existingPoster}
                alt="Existing Poster"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="text-white">No poster available</div>
            )}
          </div>

          <div className="w-full flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 hidden md:block">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full md:w-[360px] h-[45px] p-2 border rounded-md focus:ring focus:ring-indigo-300 text-white bg-input-bg"
                placeholder="Title"
                required
              />
            </div>

            <div className="flex flex-col space-y-2 hidden md:block">
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full md:w-[216px] h-[45px] p-2 border rounded-md focus:ring focus:ring-indigo-300 text-white bg-input-bg"
                placeholder="Publishing year"
                required
              />
            </div>

            <div className="flex flex-row space-x-4 mt-6 w-full">
              <button
                type="button"
                onClick={handleCancel}
                className="w-1/2 md:w-[167px] h-[54px] text-white p-2 rounded-md transition font-bold text-base border-white border-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-1/2 md:w-[180px] h-[54px] bg-button-100 text-white p-2 rounded-md hover:bg-button-200 transition font-bold text-base"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
