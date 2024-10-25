import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateMovie = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
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
                    className="w-1/2 md:w-[180px] h-[54px] bg-button-100 text-white p-2 rounded-md hover:bg-button-200 transition font-bold text-base"
                >
                    Submit
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;
