const Movie = require('../models/movie');
const cloudinary = require('cloudinary').v2;

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createMovie = async (req, res) => {
  const { title, year } = req.body;
  let imageUrl = '';

  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
  

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    imageUrl = result.secure_url; 
  }


  try {
    const movie = new Movie({
      title,
      year,
      poster: imageUrl 
    });

    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error saving movie:', error);
    res.status(500).json({ message: 'Error creating movie' });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: 'Error updating movie' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting movie' });
  }
};
