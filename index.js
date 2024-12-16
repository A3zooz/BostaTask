import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import helmet from 'helmet';
import borrowerRoutes from './routes/borrowerRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import bookBorrowerRoutes from './routes/borrowedBookRoutes.js';
import { seedDatabase, syncDatabase } from './utils/database.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/borrowers', borrowerRoutes);
app.use('/books', bookRoutes);
app.use('/book-borrowers', bookBorrowerRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
        await syncDatabase();
        if(process.env.NODE_ENV === 'development'){
            await seedDatabase();
        }
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
}

startServer();