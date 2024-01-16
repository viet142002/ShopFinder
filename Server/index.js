const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./configs/appConfig');

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose
    .connect(process.env.MONGO_URI, {
        family: 4,
    })
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.log(err);
    });
