import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import mongoose from "mongoose";

// Load environment variables
dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '..', '.env') });

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket.server.js";

const app = express();
const httpServer = createServer(app);
// Always use port 5000 for consistency
const PORT = 5000;
console.log(`Server will start on port: ${PORT}`);

const __dirname = path.resolve();

initializeSocket(httpServer);

// Increase payload size limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
// Enhanced CORS configuration for development
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL || 'http://localhost:5173',
      process.env.ADMIN_PANEL_URL || 'http://localhost:5174',
      'http://localhost:8080',
      'http://localhost:5173' // Explicitly add this for Vite dev server
    ];
    
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from ${origin}`;
      console.error('CORS Error:', msg);
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
  },
  credentials: true,
  exposedHeaders: ['set-cookie']
};

app.use(cors(corsOptions));

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
} else {
	// In development, handle unmatched routes with a 404 error
	app.use((req, res) => {
		res.status(404).json({ error: 'Route not found' });
	});
}

// Start the server
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
  connectDB();
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please close any other servers using this port.`);
  } else {
    console.error('Failed to start server:', error);
  }
  process.exit(1);
});