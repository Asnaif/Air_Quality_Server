// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http");
// const { Server } = require("socket.io"); // WebSockets
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");

// mongoose.connect('mongodb+srv://Asnaif:mXxbGmWlKyXJn6AZ@cluster0.17mfx.mongodb.net/')
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ MongoDB Connection Error:", err));

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "❌ MongoDB Connection Error:"));
// db.once("open", () => console.log("✅ Connected to MongoDB Compass!"));

// const sensorSchema = new mongoose.Schema({
//   temperature: Number,
//   humidity: Number,
//   air_quality: Number,
//   timestamp: { type: Date, default: Date.now }
// }, { collection: "SensorData" });

// const SensorData = mongoose.model("SensorData", sensorSchema);

// const app = express();
// const server = http.createServer(app);

// // ✅ Enable CORS for React frontend (usually on port 3000 during development)
// const io = new Server(server, {
//   cors: {
//     origin: "https://bright-aliza-asnaif-bfedfd0f.koyeb.app/", // 🔁 Allow requests from React development server
//     methods: ["GET", "POST"]          // 🛠 Allow HTTP methods used by React
//   }
// });

// // ✅ Allow HTTP requests from React frontend (port 3000)
// app.use(cors({ origin: "https://bright-aliza-asnaif-bfedfd0f.koyeb.app" }));

// app.use(bodyParser.json());

// // 📡 POST: Receive data from Arduino (or any sensor input source)
// app.post("/api/sensors", async (req, res) => {
//   const { temperature, humidity, air_quality } = req.body;

//   // ⚠️ Ensure air_quality is present to avoid incomplete records
//   if (air_quality === undefined) {
//     return res.status(400).json({ error: "air_quality is missing in request" });
//   }

//   try {
//     // ✅ Save new sensor reading in MongoDB
//     const newSensorData = new SensorData({ temperature, humidity, air_quality });
//     await newSensorData.save();

//     // ⚡ Emit live update to all WebSocket-connected React clients
//     io.emit("new_data", newSensorData);

//     res.status(200).json({ message: "Data stored successfully!", data: newSensorData });
//   } catch (error) {
//     console.error("❌ Error storing data:", error);
//     res.status(500).json({ error: "Failed to store data" });
//   }
// });

// // 📊 GET: Fetch all stored sensor readings
// app.get("/api/sensors", async (req, res) => {
//   try {
//     const data = await SensorData.find().sort({ timestamp: -1 }); // 🕒 Sorted newest first
//     res.status(200).json(data); // 📦 Send to React frontend
//   } catch (error) {
//     console.error("❌ Error fetching data:", error);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

// // ⚡ WebSocket setup: React frontend connects here for real-time updates
// io.on("connection", (socket) => {
//   console.log("⚡ New WebSocket Connection:", socket.id);
// });

// // 🚀 Start server on port 5000 (React usually runs on 3000)
// const PORT = 8000;
// server.listen(PORT, () => console.log(`🌍 Server running on http://localhost:${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http");
// const { Server } = require("socket.io"); // WebSockets
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");

// // MongoDB connection
// mongoose.connect('mongodb+srv://Asnaif:mXxbGmWlKyXJn6AZ@cluster0.17mfx.mongodb.net/')
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ MongoDB Connection Error:", err));

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "❌ MongoDB Connection Error:"));
// db.once("open", () => console.log("✅ Connected to MongoDB Compass!"));

// // Sensor data schema
// const sensorSchema = new mongoose.Schema({
//   temperature: Number,
//   humidity: Number,
//   air_quality: Number,
//   timestamp: { type: Date, default: Date.now }
// }, { collection: "SensorData" });

// const SensorData = mongoose.model("SensorData", sensorSchema);

// // Express app and HTTP server
// const app = express();
// const server = http.createServer(app);

// // Define allowed origins for CORS
// const allowedOrigins = [
//   'https://bright-aliza-asnaif-bfedfd0f.koyeb.app/', // Production URL without trailing slash
//   'http://localhost:3000' // Local development URL
// ];

// // Configure Socket.IO with CORS settings
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// // Configure Express CORS middleware
// app.use(cors({
//   origin: function(origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, etc.)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

// app.use(bodyParser.json());

// // POST: Receive data from Arduino (or any sensor input source)
// app.post("/api/sensors", async (req, res) => {
//   const { temperature, humidity, air_quality } = req.body;
  
//   // Ensure air_quality is present to avoid incomplete records
//   if (air_quality === undefined) {
//     return res.status(400).json({ error: "air_quality is missing in request" });
//   }
  
//   try {
//     // Save new sensor reading in MongoDB
//     const newSensorData = new SensorData({ temperature, humidity, air_quality });
//     await newSensorData.save();
    
//     // Emit live update to all WebSocket-connected React clients
//     io.emit("new_data", newSensorData);
    
//     res.status(200).json({ message: "Data stored successfully!", data: newSensorData });
//   } catch (error) {
//     console.error("❌ Error storing data:", error);
//     res.status(500).json({ error: "Failed to store data" });
//   }
// });

// // GET: Fetch all stored sensor readings
// app.get("/api/sensors", async (req, res) => {
//   try {
//     const data = await SensorData.find().sort({ timestamp: -1 }); // Sorted newest first
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("❌ Error fetching data:", error);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

// // WebSocket setup: React frontend connects here for real-time updates
// io.on("connection", (socket) => {
//   console.log("⚡ New WebSocket Connection:", socket.id);
// });

// // Start server on port 8000
// const PORT = process.env.PORT || 8000;
// server.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http");
// const { Server } = require("socket.io");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");

// // Environment variables
// require('dotenv').config();

// // MongoDB connection with improved error handling
// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Asnaif:mXxbGmWlKyXJn6AZ@cluster0.17mfx.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   retryWrites: true,
//   w: 'majority'
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => {
//   console.error("❌ MongoDB Connection Error:", err);
//   process.exit(1);
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "❌ MongoDB Connection Error:"));
// db.once("open", () => console.log("✅ Connected to MongoDB!"));

// // Sensor data schema with validation
// const sensorSchema = new mongoose.Schema({
//   temperature: { type: Number, required: true },
//   humidity: { type: Number, required: true },
//   air_quality: { type: Number, required: true },
//   timestamp: { type: Date, default: Date.now }
// }, { collection: "SensorData" });

// const SensorData = mongoose.model("SensorData", sensorSchema);

// // Express app setup
// const app = express();
// const server = http.createServer(app);

// // CORS configuration
// const allowedOrigins = [
//   'https://bright-aliza-asnaif-bfedfd0f.koyeb.app',
//   'http://localhost:3000',
//   'http://localhost:8000',
//   'https://vista-sensor-guardian.lovable.app'
// ];

// // Enhanced CORS middleware
// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.some(allowedOrigin => {
//       return origin === allowedOrigin || 
//              origin.startsWith(allowedOrigin.replace('https://', 'http://'));
//     })) {
//       return callback(null, true);
//     }
    
//     const msg = `The CORS policy for this site does not allow access from ${origin}`;
//     return callback(new Error(msg), false);
//   },
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200
// }));

// // // Pre-flight requests
// // app.options('*', cors());

// // Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'healthy', timestamp: new Date() });
// });

// // Sensor data endpoints
// app.post("/api/sensors", async (req, res) => {
//   try {
//     const { temperature, humidity, air_quality } = req.body;
    
//     if (typeof temperature !== 'number' || 
//         typeof humidity !== 'number' || 
//         typeof air_quality !== 'number') {
//       return res.status(400).json({ 
//         error: "Invalid data format. All fields must be numbers." 
//       });
//     }

//     const newSensorData = new SensorData({ 
//       temperature, 
//       humidity, 
//       air_quality 
//     });
    
//     await newSensorData.save();
//     io.emit("new_data", newSensorData);
    
//     res.status(201).json({ 
//       message: "Data stored successfully!", 
//       data: newSensorData 
//     });
    
//   } catch (error) {
//     console.error("❌ Error storing data:", error);
//     res.status(500).json({ 
//       error: "Internal server error",
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// app.get("/api/sensors", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 100;
//     const data = await SensorData.find()
//       .sort({ timestamp: -1 })
//       .limit(limit);
      
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("❌ Error fetching data:", error);
//     res.status(500).json({ 
//       error: "Failed to fetch data",
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // WebSocket setup
// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true
//   },
//   connectionStateRecovery: {
//     maxDisconnectionDuration: 2 * 60 * 1000,
//     skipMiddlewares: true
//   }
// });

// io.on("connection", (socket) => {
//   console.log("⚡ New WebSocket Connection:", socket.id);
  
//   socket.on("disconnect", () => {
//     console.log("❌ WebSocket Disconnected:", socket.id);
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('❌ Server Error:', err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // Start server
// const PORT = process.env.PORT || 8000;
// server.listen(PORT, () => {
//   console.log(`🌍 Server running on port ${PORT}`);
//   console.log(`🛡️  CORS allowed for: ${allowedOrigins.join(', ')}`);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const path = require("path");
// const axios = require("axios"); // Added for API requests

// // Environment variables
// require('dotenv').config();

// // MongoDB connection with improved error handling
// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Asnaif:mXxbGmWlKyXJn6AZ@cluster0.17mfx.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   retryWrites: true,
//   w: 'majority'
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => {
//   console.error("❌ MongoDB Connection Error:", err);
//   process.exit(1);
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "❌ MongoDB Connection Error:"));
// db.once("open", () => console.log("✅ Connected to MongoDB!"));

// // Sensor data schema with validation
// const sensorSchema = new mongoose.Schema({
//   temperature: { type: Number, required: true },
//   humidity: { type: Number, required: true },
//   air_quality: { type: Number, required: true },
//   timestamp: { type: Date, default: Date.now }
// }, { collection: "SensorData" });

// const SensorData = mongoose.model("SensorData", sensorSchema);

// // Express app setup
// const app = express();

// // Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'healthy', timestamp: new Date() });
// });

// // Fetch data from external API endpoint
// app.get("/api/sensors", async (req, res) => {
//   try {
//     const response = await axios.get("https://bright-aliza-asnaif-bfedfd0f.koyeb.app/api/sensors");
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("❌ Error fetching data from API:", error);
//     res.status(500).json({ 
//       error: "Failed to fetch data from external API",
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // Local sensor data endpoints (kept for compatibility)
// app.post("/api/sensors", async (req, res) => {
//   try {
//     const { temperature, humidity, air_quality } = req.body;
    
//     if (typeof temperature !== 'number' || 
//         typeof humidity !== 'number' || 
//         typeof air_quality !== 'number') {
//       return res.status(400).json({ 
//         error: "Invalid data format. All fields must be numbers." 
//       });
//     }

//     const newSensorData = new SensorData({ 
//       temperature, 
//       humidity, 
//       air_quality 
//     });
    
//     await newSensorData.save();
    
//     res.status(201).json({ 
//       message: "Data stored successfully!", 
//       data: newSensorData 
//     });
    
//   } catch (error) {
//     console.error("❌ Error storing data:", error);
//     res.status(500).json({ 
//       error: "Internal server error",
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// });

// // app.get("/api/sensors", async (req, res) => {
// //   try {
// //     const limit = parseInt(req.query.limit) || 100;
// //     const data = await SensorData.find()
// //       .sort({ timestamp: -1 })
// //       .limit(limit);
      
// //     res.status(200).json(data);
// //   } catch (error) {
// //     console.error("❌ Error fetching data:", error);
// //     res.status(500).json({ 
// //       error: "Failed to fetch data",
// //       details: process.env.NODE_ENV === 'development' ? error.message : undefined
// //     });
// //   }
// // });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('❌ Server Error:', err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`🌍 Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Database connection
mongoose.connect('mongodb+srv://Asnaif:mXxbGmWlKyXJn6AZ@cluster0.17mfx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB Connection Error:"));
db.once("open", () => console.log("✅ Connected to MongoDB Compass!"));

// Schema definition
const sensorSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  air_quality: Number,
  timestamp: { type: Date, default: Date.now }
}, { collection: "SensorData" });

const SensorData = mongoose.model("SensorData", sensorSchema);

// Express app setup
const app = express();
const server = http.createServer(app);

// CORS configuration - allow all origins during debugging
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins temporarily for debugging
    methods: ["GET", "POST"]
  }
});

// Configure CORS for Express to allow all origins during debugging
app.use(cors({ origin: "*" }));

// Configure body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add support for form data

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Sensor API is running. Use /api/sensors to post data.");
});

// POST endpoint for sensor data
app.post("/api/sensors", async (req, res) => {
  console.log("📡 Received sensor data:", req.body);
  
  const { temperature, humidity, air_quality } = req.body;
  
  // Validate input
  if (temperature === undefined || humidity === undefined || air_quality === undefined) {
    console.log("⚠️ Missing required sensor data fields");
    return res.status(400).json({ 
      error: "Missing required fields", 
      received: req.body,
      required: ["temperature", "humidity", "air_quality"] 
    });
  }
  
  try {
    // Save new sensor reading
    const newSensorData = new SensorData({ 
      temperature: parseFloat(temperature), 
      humidity: parseFloat(humidity), 
      air_quality: parseInt(air_quality) 
    });
    
    await newSensorData.save();
    console.log("✅ Data saved successfully:", newSensorData);
    
    // Emit live update
    io.emit("new_data", newSensorData);
    
    res.status(200).json({ 
      message: "Data stored successfully!", 
      data: newSensorData 
    });
  } catch (error) {
    console.error("❌ Error storing data:", error);
    res.status(500).json({ error: "Failed to store data", details: error.message });
  }
});

// GET endpoint for sensor data
app.get("/api/sensors", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
});

// WebSocket setup
io.on("connection", (socket) => {
  console.log("⚡ New WebSocket Connection:", socket.id);
  
  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🌍 Server running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/sensors`);
});
