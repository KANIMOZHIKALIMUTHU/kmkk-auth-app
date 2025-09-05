// backend/server.js
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// Add all frontend URLs that need to access the backend
const allowedOrigins = [
  "http://localhost:3000",                                         // local dev
  "https://kmkk-auth-app.vercel.app",                               // production main
  "https://kmkk-auth-65mpor8o3-kanimozhikalimuthus-projects.vercel.app" // deployed project preview
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (e.g., Postman, preflight)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn("Blocked CORS request from:", origin);
    return callback(null, false); // reject unknown origins
  },
  credentials: true, // allow cookies
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Handle preflight OPTIONS requests for all routes
app.options("*", cors());

// Body parser & cookies
app.use(express.json());
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: "secret-key", // store securely in .env for production
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "none", // allow cross-site cookies
  }
}));

// Debug: log request origin for verification
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// Routes
app.use("/auth", authRoutes);

// Dynamic port for Render or local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth API running on port ${PORT}`);
});
