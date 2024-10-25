import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateMovie = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageUpload = (e) => {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleImageUpload(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/movies/createMovie', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Error creating movie:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen p-2 md:p-8 bg-page-bg flex flex-col items-center justify-center">
      <div className="p-10 bg-page-bg flex flex-col w-full max-w-7xl">
        <h2 className="text-2xl sm:ml-12 sm:text-4xl md:text-5xl font-semibold mb-8 md:mb-16 text-white text-center md:text-left">
          Create a New Movie
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
          
          <div
            className={`w-full max-w-lg md:w-[473px] h-[400px] border-2 ${
              dragging ? 'border-indigo-600' : 'border-gray-300'
            } border-dashed rounded-md flex items-center justify-center cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label htmlFor="image-upload" className="cursor-pointer text-gray-500 w-full h-full">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span>{dragging ? 'Drop the image here...' : 'Drop an image here'}</span>
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
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
                    disabled={loading}
                    className={`w-1/2 md:w-[180px] h-[54px] ${
                      loading ? 'bg-gray-500' : 'bg-button-100 hover:bg-button-200'
                    } text-white p-2 rounded-md transition font-bold text-base`}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-screen h-[120px] z-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 111" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L60 4.2C120 8.3 240 16.7 360 30.8C480 45.2 600 65.8 720 70C840 74.1 960 61.6 1080 57.7C1200 53.6 1320 57.7 1380 60L1440 62V111H1380C1320 111 1200 111 1080 111C960 111 840 111 720 111C600 111 480 111 360 111C240 111 120 111 60 111H0V0Z" fill="#20DF7F" fillOpacity="0.09"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 44.4L48 53.3C96 62.2 192 79.9 288 75.5C384 71.0 480 44.4 576 26.6C672 8.9 768 0 864 0C960 0 1056 8.9 1152 24.4C1248 40.0 1344 62.2 1392 73.3L1440 84.4V111H1392C1344 111 1248 111 1152 111C1056 111 960 111 864 111C768 111 672 111 576 111C480 111 384 111 288 111C192 111 96 111 48 111H0V44.4Z" fill="#E5E5E5" fillOpacity="0.13"/>
        </svg>
      </div>
    </div>
  );
};

export default CreateMovie;
