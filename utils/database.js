import logger from "./logger.js";
import Book from "../schema/Book.js";
import BorrowedBook from "../schema/BorrowedBook.js";
import Borrower from "../schema/Borrower.js";

export const syncDatabase = async () => {
    try{
        await Book.sync({ alter: true });
        await Borrower.sync({ alter: true });
        await BorrowedBook.sync({ alter: true });
        logger.info("Database synchronized");
    } catch (error) {
        logger.error("Unable to sync database:", error);
    }
}

export const seedDatabase = async () => {
    try {
      // Seed Books
      const books = await Book.bulkCreate([
        {
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          ISBN: '978-0743273565',
          totalQuantity: 5,
          availableQuantity: 5,
          shelfLocation: 'A1'
        },
        {
          title: '1984',
          author: 'George Orwell',
          ISBN: '978-0451524935',
          totalQuantity: 3,
          availableQuantity: 3,
          shelfLocation: 'A2'
        },
        {
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          ISBN: '978-0446310789',
          totalQuantity: 4,
          availableQuantity: 4,
          shelfLocation: 'B1'
        }
      ]);
  
      // Seed Borrowers
      const borrowers = await Borrower.bulkCreate([
        {
          firstName: 'John',
            lastName: 'Doe',
          email: 'john@example.com'
        },
        {
          firstName: 'Jane',
            lastName: 'Smith',
          email: 'jane@example.com'
        },
        {
          firstName: 'Bob',
          lastName: 'Wilson',
          email: 'bob@example.com'
        }
      ]);
  
      // Create some borrow records
      await BorrowedBook.bulkCreate([
        {
          BookId: books[0].id,
          BorrowerId: borrowers[0].id,
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
        },
        {
          BookId: books[1].id,
          BorrowerId: borrowers[1].id,
          dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago (overdue)
          status: 'overdue'
        }
      ]);
  
      // Update available quantities
      await books[0].update({ availableQuantity: books[0].availableQuantity - 1 });
      await books[1].update({ availableQuantity: books[1].availableQuantity - 1 });
  
      logger.info('Database seeded successfully');
    } catch (error) {
      logger.error('Database seeding failed:', error);
      throw error;
    }
  };