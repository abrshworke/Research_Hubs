

import mongoose from 'mongoose';

let isConnected = false; 

export const ConnectMongo = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('DB already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MYDB, {
            dbName: "Researche_Hub",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true; 
        console.log('MongoDB connected');

    } catch (error) {
        console.error('MongoDB connection error:', error);
        return; 
    }
};

