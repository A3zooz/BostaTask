import { QueryTypes } from "sequelize";
import { Op } from "sequelize";
import BorrowedBook from "../schema/BorrowedBook.js";
import Book from "../schema/Book.js";
import Borrower from "../schema/Borrower.js";

export const checkout = async (req, res) => {
    try {
        const { bookId, borrowerId, dueDate } = req.body;

        const book = await Book.findByPk(bookId);
        if(!book || book.availableQuantity == 0)
        {
            return res.status(400).json({ error: "Book not available" });
        }

        const borrower = await Borrower.findByPk(borrowerId);
        if(!borrower)
        {
            return res.status(400).json({ error: "Borrower not found" });
        }
        const borrowedBook = await BorrowedBook.create({
            bookId: bookId,
            borrowerId: borrowerId,
            dueDate: dueDate
        });
        await book.update({ availableQuantity: book.availableQuantity - 1 });
        res.status(201).json(borrowedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const returnBook = async (req, res) => {
    try {
        const borrowedBook = await BorrowedBook.findByPk(req.params.id,
            {
                include: [Book]
            }
        );
        if (!borrowedBook) {
            return res.status(404).json({ error: "Borrowed book not found" });
        }
        if(borrowedBook.returnDate || borrowedBook.status == "returned")
        {
            return res.status(400).json({ error: "Book already returned" });
        }

        await borrowedBook.update({ returnDate: new Date(), status: "returned" });
        await borrowedBook.Book.update({ availableQuantity: borrowedBook.Book.availableQuantity + 1 });
        res.status(200).json(borrowedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getBorrowedBooksByBorrowerId = async (req, res) => {
    try {
        const borrowedBooks = await BorrowedBook.findAll({
            where: { borrowerId: req.params.id
                , returnDate: null,
                status: 'borrowed'
            },
            include: [Book]
        });
        res.status(200).json(borrowedBooks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getOverdueBooks = async (req, res) => {
    try {
        const overdueBooks = await BorrowedBook.findAll({
            where: //borrowdate < current date and status != returned
            {
                dueDate: {
                    [Op.lt]: new Date()
                },
                status: {
                    [Op.ne]: 'returned'
                }
            },
            include: [Book]
        });
        res.status(200).json(overdueBooks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}