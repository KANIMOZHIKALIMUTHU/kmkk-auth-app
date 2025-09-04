import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure: true only in https
  })
);

// ✅ Allow frontend (Vercel) to connect
app.use(
  cors({
    origin: "https://kmkk-auth-app.vercel.app", // Replace with Vercel frontend URL
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Root check
app.get("/", (req, res) => {
  res.send("Auth API running 🚀");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
