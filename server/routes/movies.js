const express = require('express');
const router = express.Router();
const { getMovies, createMovie, updateMovie, deleteMovie, getMovie } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', protect, getMovies);
router.post('/createMovie', protect, upload.single('image'), createMovie);
router.get('/:id', protect, getMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);

module.exports = router;
