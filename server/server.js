const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { uploadImage } = require("./controllers/imageController");
const { protect } = require("./middleware/auth");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/artworks", require("./routes/artworkRoutes"));
app.use("/api/collections", require("./routes/collectionRoutes"));
app.use("/api/exhibitions", require("./routes/exhibitionRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

app.post("/api/upload", protect, uploadImage);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Keep server alive by pinging every 5 minutes
  const EXTERNAL_URL = process.env.EXTERNAL_URL;

  if (EXTERNAL_URL) {
    setInterval(
      async () => {
        try {
          const response = await fetch(`${EXTERNAL_URL}/api/health`);

          console.log(
            `Keep-alive ping: ${response.status} - ${new Date().toISOString()}`,
          );
        } catch (error) {
          console.error("Keep-alive ping failed:", error.message);
        }
      },
      5 * 60 * 1000,
    );
  }
});
