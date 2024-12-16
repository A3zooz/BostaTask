import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Book from './Book.js';
import Borrower from './Borrower.js';

const BorrowedBook = sequelize.define('BorrowedBook', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('borrowed', 'returned', 'overdue'),
        allowNull: false,
        defaultValue: 'borrowed'
        
    }
});

BorrowedBook.belongsTo(Book, { foreignKey: 'bookId' });
BorrowedBook.belongsTo(Borrower, { foreignKey: 'borrowerId' });
Book.hasMany(BorrowedBook, { foreignKey: 'bookId' });
Borrower.hasMany(BorrowedBook, { foreignKey: 'borrowerId' });

export default BorrowedBook;