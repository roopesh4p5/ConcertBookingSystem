import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import SeatsRoutes from './routes/seats.routes';
import BookingRoutes from './routes/booking.routes';
import { sequelize } from './config/dbconfig';

dotenv.config();
const app = express();
const PORT =  3000;
app.use(express.json());

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.error('Unable to connect to the database:', err));  


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api', userRoutes);
app.use('/api', SeatsRoutes);
app.use('/api', BookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 