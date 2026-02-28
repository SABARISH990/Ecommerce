const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL)
        .then((con) => {
            console.log("DB_URL =", process.env.DB_URL);
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err);
            process.exit(1);
        });
};

module.exports = connectDatabase;
