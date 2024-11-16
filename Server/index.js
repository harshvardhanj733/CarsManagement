import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db.js'
import UserRouter from './Routes/UserRoute.js'
import ProductRouter from './Routes/ProductRoute.js'

const port = 80;
// const key = process.env.KEY;

const app = express();

app.use(express.urlencoded({ extended: true, limit: "50mb" })); //for MongoDB
app.use(express.json({ limit: "50mb" }));
app.use(cors())
app.options('*', cors())

dotenv.config()
db();

//routes
app.use('/api/user', UserRouter)
app.use('/api/product', ProductRouter)

app.listen(port, () => {
    console.log(`Server Running Successfully on http://localhost:${port}`);
})