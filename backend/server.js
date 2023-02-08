const express = require('express');
const app = express();
const port = 5000;
const { errorMiddleware } = require('./middleware/errorMiddleware')
const cors = require('cors')
const env = require('dotenv')
const connectToMongo = require('./config/config');
const operation = require('./seeder')
const userRoutes = require('./routes/userRoutes')

env.config();
//Connecting to mongoDb Database
connectToMongo(process.env.MONGO_URL);

app.use(cors());
app.use(express.json());


//Too enter the sample data in database.
// operation.importData()
// operation.destroyData()

app.use('/api/users', userRoutes)


app.use(errorMiddleware)
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`.blue)
})