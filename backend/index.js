import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import taskRouter from "./routes/task.route.js";
import userRouter from "./routes/user.route.js";


const app=express();
const Port=process.env.PORT || 5000;

dotenv.config();
console.log(process.env.MONGO_URI);

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

app.listen(Port,()=>{
    connectDB();
    console.log("server running at http://localhost:"+Port);
});

// FmJhcomazwuY49yh password
// connection string: mongodb+srv://23eg107c59:<db_password>@tasks.y9nn7zz.mongodb.net/?retryWrites=true&w=majority&appName=Tasks