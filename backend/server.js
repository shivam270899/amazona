const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

mongoose.connect(process.env.MONGODB_URL ||  'mongodb://localhost/amazona',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})
app.use((err , req, res, next) => {
    res.status(500).send({message: err.message })
})

app.get('/', (req, res) => {
    res.send('server is ready');
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});