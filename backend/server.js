// backend/server.js
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",            // local dev
  "https://kmkk-auth-app.vercel.app", // production
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow requests like Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("CORS policy: Origin not allowed"));
  },
  credentials: true, // allow cookies
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Handle preflight OPTIONS requests for all routes
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body parser & cookies
app.use(express.json());
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: "secret-key", // store securely in .env in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "none", // allow cross-site cookies
  }
}));

// Debug: log incoming origin
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// Routes
app.use("/auth", authRoutes);

// Dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth API running on port ${PORT}`);
});
