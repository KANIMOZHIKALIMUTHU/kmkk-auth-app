import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// Your deployed frontend URL
const FRONTEND_URL = "https://kmkk-auth-app.vercel.app";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true, // allow cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,       // important for HTTPS
      sameSite: "none",   // allow cross-site cookies
    },
  })
);

app.use("/api", authRoutes);

app.listen(10000, () => {
  console.log("Auth API running on port 10000");
});
