const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();
const uploadDir = path.join(__dirname, "uploads-ruangbangun");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ruangbangun_db",
  connectionLimit: 10,
});

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads-ruangbangun", express.static(uploadDir));

const signToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET || "ruangbangun-secret", { expiresIn: "1d" });

const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "ruangbangun-secret");
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

const toJson = (raw, fallback) => {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const normalizePortfolio = (row) => ({
  ...row,
  images: toJson(row.images, []),
});

const toUploadAbsolutePath = (filePath) => {
  if (!filePath || typeof filePath !== "string") return null;
  if (!filePath.startsWith("/uploads-ruangbangun/")) return null;
  return path.join(__dirname, filePath.replace(/^\//, ""));
};

const removeUploadedFiles = async (paths = []) => {
  await Promise.all(
    paths.map(async (filePath) => {
      const absolutePath = toUploadAbsolutePath(filePath);
      if (!absolutePath) return;
      try {
        await fs.promises.unlink(absolutePath);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error(`Failed to remove file ${absolutePath}:`, error.message);
        }
      }
    }),
  );
};

async function ensureDefaultAdmin() {
  const [rows] = await pool.query("SELECT id FROM admins LIMIT 1");
  if (rows.length) return;
  const email = process.env.ADMIN_EMAIL || "admin@ruangbangun.id";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hash = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO admins(name,email,password_hash) VALUES(?,?,?)", ["Super Admin", email, hash]);
  console.log(`Default admin created: ${email} / ${password}`);
}

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM admins WHERE email = ? LIMIT 1", [email]);
    if (!rows.length) return res.status(401).json({ message: "Email tidak ditemukan" });
    const admin = rows[0];
    const ok = await bcrypt.compare(password, admin.password_hash);
    if (!ok) return res.status(401).json({ message: "Password salah" });
    res.json({ token: signToken({ id: admin.id, email: admin.email }) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/banners", async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM banners ORDER BY created_at DESC");
  res.json(rows);
});

app.get("/api/services", async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM services ORDER BY created_at DESC");
  res.json(rows);
});

app.get("/api/portfolios", async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM portfolios ORDER BY created_at DESC");
  res.json(rows.map(normalizePortfolio));
});

app.get("/api/testimonials", async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM testimonials ORDER BY created_at DESC");
  res.json(rows);
});

app.get("/api/settings", async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM settings WHERE id=1 LIMIT 1");
  if (!rows.length) return res.json({});
  const row = rows[0];
  row.faqs = toJson(row.faqs, []);
  res.json(row);
});

app.post("/api/admin/banners", auth, upload.single("image"), async (req, res) => {
  const { title, subtitle } = req.body;
  const image = req.file ? `/uploads-ruangbangun/${req.file.filename}` : null;
  await pool.query("INSERT INTO banners(title,subtitle,image) VALUES(?,?,?)", [title, subtitle, image]);
  res.json({ message: "Banner created" });
});
app.delete("/api/admin/banners/:id", auth, async (req, res) => {
  await pool.query("DELETE FROM banners WHERE id = ?", [req.params.id]);
  res.json({ message: "Banner deleted" });
});

app.post("/api/admin/services", auth, async (req, res) => {
  const { title, description } = req.body;
  await pool.query("INSERT INTO services(title,description) VALUES(?,?)", [title, description]);
  res.json({ message: "Service created" });
});
app.delete("/api/admin/services/:id", auth, async (req, res) => {
  await pool.query("DELETE FROM services WHERE id = ?", [req.params.id]);
  res.json({ message: "Service deleted" });
});

app.post("/api/admin/testimonials", auth, async (req, res) => {
  const { name, quote } = req.body;
  if (!name || !quote) return res.status(400).json({ message: "Nama dan testimoni wajib diisi" });
  await pool.query("INSERT INTO testimonials(name,quote) VALUES(?,?)", [name, quote]);
  res.json({ message: "Testimonial created" });
});
app.put("/api/admin/testimonials/:id", auth, async (req, res) => {
  const { name, quote } = req.body;
  if (!name || !quote) return res.status(400).json({ message: "Nama dan testimoni wajib diisi" });
  await pool.query("UPDATE testimonials SET name = ?, quote = ? WHERE id = ?", [name, quote, req.params.id]);
  res.json({ message: "Testimonial updated" });
});
app.delete("/api/admin/testimonials/:id", auth, async (req, res) => {
  await pool.query("DELETE FROM testimonials WHERE id = ?", [req.params.id]);
  res.json({ message: "Testimonial deleted" });
});

app.post("/api/admin/portfolios", auth, upload.array("images", 20), async (req, res) => {
  const { title, category, description } = req.body;
  const images = (req.files || []).map((f) => `/uploads-ruangbangun/${f.filename}`);
  await pool.query("INSERT INTO portfolios(title,category,description,images) VALUES(?,?,?,?)", [
    title,
    category,
    description,
    JSON.stringify(images),
  ]);
  res.json({ message: "Portfolio created" });
});
app.put("/api/admin/portfolios/:id", auth, upload.array("images", 20), async (req, res) => {
  const { title, category, description, keep_images } = req.body;
  const [rows] = await pool.query("SELECT images FROM portfolios WHERE id = ? LIMIT 1", [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: "Portfolio tidak ditemukan" });

  const oldImages = toJson(rows[0].images, []);
  const incomingKeepImages = Array.isArray(keep_images) ? keep_images : toJson(keep_images, oldImages);
  const keptImages = oldImages.filter((img) => incomingKeepImages.includes(img));
  const newImages = (req.files || []).map((f) => `/uploads-ruangbangun/${f.filename}`);
  const finalImages = [...keptImages, ...newImages];

  await pool.query("UPDATE portfolios SET title = ?, category = ?, description = ?, images = ? WHERE id = ?", [
    title || "",
    category || "",
    description || "",
    JSON.stringify(finalImages),
    req.params.id,
  ]);

  const unusedImages = oldImages.filter((img) => !finalImages.includes(img));
  await removeUploadedFiles(unusedImages);

  res.json({ message: "Portfolio updated" });
});
app.delete("/api/admin/portfolios/:id", auth, async (req, res) => {
  const [rows] = await pool.query("SELECT images FROM portfolios WHERE id = ? LIMIT 1", [req.params.id]);
  const oldImages = rows.length ? toJson(rows[0].images, []) : [];
  await pool.query("DELETE FROM portfolios WHERE id = ?", [req.params.id]);
  await removeUploadedFiles(oldImages);
  res.json({ message: "Portfolio deleted" });
});

app.put("/api/admin/settings", auth, async (req, res) => {
  const { about_us, email, phone, address, maps_url, faqs } = req.body;
  await pool.query(
    `INSERT INTO settings (id, about_us, email, phone, address, maps_url, faqs)
     VALUES (1,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE about_us=VALUES(about_us), email=VALUES(email), phone=VALUES(phone),
     address=VALUES(address), maps_url=VALUES(maps_url), faqs=VALUES(faqs)`,
    [about_us || "", email || "", phone || "", address || "", maps_url || "", JSON.stringify(faqs || [])],
  );
  res.json({ message: "Settings updated" });
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = Number(process.env.PORT || 5000);

app.listen(port, async () => {
  console.log(`Backend running on http://localhost:${port}`);
  try {
    await ensureDefaultAdmin();
  } catch (error) {
    console.error("Ensure admin failed:", error.message);
  }
});
