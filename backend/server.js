import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
