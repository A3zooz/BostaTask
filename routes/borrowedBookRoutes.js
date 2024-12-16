import express from 'express';
import { checkout, getBorrowedBooksByBorrowerId, getOverdueBooks, returnBook } from '../controllers/borrowedBookController.js';

const router = express.Router();

router.post('/checkout', checkout);
router.put('/return/:id', returnBook);
router.get('/borrower/:id', getBorrowedBooksByBorrowerId);
router.get('/overdue', getOverdueBooks);

export default router;