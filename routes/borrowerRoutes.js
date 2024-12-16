import express from 'express';
import { addBorrower, deleteBorrower, getAllBorrowers, getBorrowerById, updateBorrower } from '../controllers/borrowerController.js';

const router = express.Router();

router.post('/', addBorrower);
router.get('/', getAllBorrowers);
router.put('/:id', updateBorrower);
router.get('/:id', getBorrowerById);
router.delete('/:id', deleteBorrower);

export default router;