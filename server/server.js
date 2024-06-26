import app from "./app.js";
import { connectDatabase } from "./config/database.js";

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`the server is running on http://${process.env.hostname}:${process.env.PORT}`);
});