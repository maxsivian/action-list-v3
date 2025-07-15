import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
// import path from "path";
// import { fileURLToPath } from "url";

import { connectDB } from "./utils/connectDB.js";
import { checkENVs } from "./utils/checkENVs.js";

import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import accountsRoutes from "./routes/accountRoutes.js"


dotenv.config()

const requiredENVs = ["PORT", "HOST", "JWT_SECRET", "MONGODB_URI", "GOOGLE_CLIENT_ID", "EMAIL_TRANSPORTER_USER", "EMAIL_TRANSPORTER_PASS", "CLIENT_BASE"]
checkENVs(requiredENVs)

const HOST = process.env.HOST
const PORT = process.env.PORT
const CLIENT_BASE = process.env.CLIENT_BASE

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename); 
const app = express();

// app.use(cors())

app.use(cors({
    origin: CLIENT_BASE,
    methods: ['GET', 'POST', "PUT", "DELETE"],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));


// app.use(cors({
//     origin: 'https://action-list-v3-maxsivians-projects.vercel.app',
//     methods: ['GET', 'POST', "PUT", "DELETE"],
//     allowedHeaders: ['Content-Type'],
//     credentials: true
// }));

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());


await connectDB()

// app.use("/get-tasks", GetTasksRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/account", accountsRoutes);


app.get("/", (req, res) => {
    res.send("🌐 ACTION LIST V3 SERVER IS WORKING ✅");
});


app.listen(PORT, HOST, () => {
    console.log("\n===== ACTION LIST V3 =====");
    console.log("✅ Server is up and running!");
    console.log(`🌐 http://${HOST}:${PORT}`);
    console.log("\n");
});







