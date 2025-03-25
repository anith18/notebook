const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://anith:anith123@cluster0.jrhtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = () => {
    try {
         mongoose.connect(mongoURI, {
        });
        console.log("✅ Connected to MongoDB Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit process if MongoDB connection fails
    }
};

module.exports = connectToMongo;
