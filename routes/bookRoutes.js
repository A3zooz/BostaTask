import express from 'express';
import {addBook, deleteBook, getAllBooks,
    searchBooks, getBookById,
    updateBook} from '../controllers/bookController.js';

const router = express.Router();

router.post('/', addBook);
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
