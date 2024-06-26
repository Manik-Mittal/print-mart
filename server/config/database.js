import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose.connect(process.env.Mongo_uri)
        .then((con) => console.log(`Database connected: ${con.connection.host}`))
        .catch((err) => console.log(err));
}
