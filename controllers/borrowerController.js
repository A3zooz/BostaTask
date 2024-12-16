import { QueryTypes,Op } from "sequelize";
import Borrower from "../schema/Borrower.js";

export const addBorrower = async (req, res) => {
    try {
        const borrower = await Borrower.create(req.body);
        res.status(201).json(borrower);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    }
export const getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.findAll();
        res.status(200).json(borrowers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    }

export const getBorrowerById = async (req, res) => {
    try {
        const borrower = await Borrower.findByPk(req.params.id);
        if (!borrower) {
            return res.status(404).json({ error: "Borrower not found" });
        }
        res.status(200).json(borrower);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    }

export const updateBorrower = async (req, res) => {
    try {
        const borrower = await Borrower.findByPk(req.params.id);
        if (!borrower) {
            return res.status(404).json({ error: "Borrower not found" });
        }
        await borrower.update(req.body);
        res.status(200).json(borrower);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    }

export const deleteBorrower = async (req, res) => {
    try {
        const borrower = await Borrower.findByPk(req.params.id);
        if (!borrower) {
            return res.status(404).json({ error: "Borrower not found" });
        }
        await borrower.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    }

