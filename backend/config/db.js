const mongoose = require('mongoose');

const connectDB = async() => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            // useUnifiedTopology: true  
        });
    
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
     } catch (error) {
        console.log(`Could not Establish Connection MongoDB, Check Connection String or Check Your Internet Connection first`.red.underline.bold);
     }

};

module.exports = connectDB;
