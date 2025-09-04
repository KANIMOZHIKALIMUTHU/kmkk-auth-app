// backend/server.js
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// Your deployed frontend URL
const FRONTEND_URL = "https://kmkk-auth-app.vercel.app";

// Middlewares
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true, // allow cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret-key", // store in env in real apps
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS in prod only
      sameSite: "none", // allow cross-site cookies (frontend <-> backend)
    },
  })
);

// Routes
app.use("/api", authRoutes);

// Dynamic port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth API running on port ${PORT}`);
});
