import { Op } from "sequelize";
import Book from "../schema/Book.js";
import {QueryTypes} from "sequelize";

export const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    }

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        await book.update(req.body);
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };


export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        await book.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

export const searchBooks = async (req, res) => {
    try {
        const books = await sequalize.query(
            `SELECT * FROM "Books" WHERE title LIKE '%${req.query.title}%' OR author LIKE '%${req.query.author}%' OR ISBN LIKE '%${req.query.ISBN}%'`,
            { type: QueryTypes.SELECT }
        );
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    }
