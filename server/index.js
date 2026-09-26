import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// In-Memory Database Store (with MongoDB Schema Structure readiness)
const db = {
  vehicles: [
    { id: 'RCC-001', name: 'Tesla Model Y — Rear Communicator Edition', speed: 48, status: 'SAFE', lat: 37.7749, lng: -122.4194, battery: 84 },
    { id: 'RCC-002', name: 'Follower Vehicle', speed: 50, status: 'SAFE', lat: 37.7740, lng: -122.4190, battery: 92 },
    { id: 'RCC-004', name: 'Cross Traffic Car', speed: 42, status: 'SAFE', lat: 37.7760, lng: -122.4175, battery: 78 },
  ],
  hazards: [
    {
      id: 'HAZ-101',
      type: 'pothole',
      title: 'Deep Asphalt Pothole',
      description: 'Severe road surface depression detected by Vehicle RCC-001 AI Vision.',
      confidence: 94,
      distanceApproxMeters: 40,
      lanePosition: 'YOUR LANE',
      severity: 'HIGH',
      latitude: 37.7752,
      longitude: -122.4188,
      reportedByVehicleId: 'RCC-001',
      confirmationsCount: 8,
      timestamp: new Date().toISOString(),
      status: 'CONFIRMED',
    }
  ],
  emergencies: [],
  communications: [],
  analytics: {
    connectedVehicles: 1248,
    activeHazards: 38,
    emergencyAlerts: 6,
    aiDetections: 4892,
    verifiedHazards: 31,
    avgAlertDeliverySec: 2.4,
  }
};

// API Endpoints (Section 35)

// POST /api/vehicle/communication — Trigger rear display & broadcast message
app.post('/api/vehicle/communication', (req, res) => {
  const { senderVehicleId, displayMessage, priority } = req.body;
  const commEvent = {
    id: 'COMM-' + Math.random().toString(36).substring(2, 9),
    senderVehicleId: senderVehicleId || 'RCC-001',
    displayMessage: displayMessage || 'PASS FROM LEFT →',
    priority: priority || 'P3',
    timestamp: new Date().toISOString(),
    status: 'TRANSMITTING',
  };
  db.communications.unshift(commEvent);
  io.emit('vehicle:message', commEvent);
  res.json({ success: true, event: commEvent });
});

// GET /api/hazards — Fetch active road hazards
app.get('/api/hazards', (req, res) => {
  res.json({ success: true, hazards: db.hazards });
});

// POST /api/hazards — Report or auto-broadcast road hazard
app.post('/api/hazards', (req, res) => {
  const hazard = {
    id: 'HAZ-' + Math.floor(100 + Math.random() * 900),
    ...req.body,
    timestamp: new Date().toISOString(),
    status: req.body.confirmationsCount >= 3 ? 'CONFIRMED' : 'UNCONFIRMED',
  };
  db.hazards.unshift(hazard);
  io.emit('hazard:detected', hazard);
  res.json({ success: true, hazard });
});

// POST /api/emergency — Trigger SOS Workflow
app.post('/api/emergency', (req, res) => {
  const emergency = {
    id: 'EMG-' + Date.now(),
    vehicleId: req.body.vehicleId || 'RCC-001',
    latitude: req.body.latitude || 37.7749,
    longitude: req.body.longitude || -122.4194,
    timestamp: new Date().toISOString(),
    status: 'ACTIVE',
  };
  db.emergencies.unshift(emergency);
  io.emit('emergency:activated', emergency);
  res.json({ success: true, emergency });
});

// GET /api/vehicles/nearby — Fetch nearby vehicles
app.get('/api/vehicles/nearby', (req, res) => {
  res.json({ success: true, vehicles: db.vehicles });
});

// POST /api/ai/detect — Process object detection frame
app.post('/api/ai/detect', (req, res) => {
  res.json({
    success: true,
    detections: [
      { label: 'Pothole', confidence: 94, distanceApproxMeters: 40, lanePosition: 'YOUR LANE', severity: 'HIGH' }
    ]
  });
});

// POST /api/ai/intent — Voice speech NLP intent parsing
app.post('/api/ai/intent', (req, res) => {
  const text = (req.body.text || '').toLowerCase();
  let intent = 'OVERTAKE_LEFT';
  let message = 'PASS FROM LEFT →';
  if (text.includes('right')) message = '← PASS FROM RIGHT';
  if (text.includes('stop')) message = 'WAIT';
  if (text.includes('help')) message = '🚨 EMERGENCY — HELP';

  res.json({ success: true, intent, message });
});

// GET /api/analytics — Fetch traffic control KPIs
app.get('/api/analytics', (req, res) => {
  res.json({ success: true, analytics: db.analytics });
});

// Socket.IO Connection Handler (Section 36)
io.on('connection', (socket) => {
  console.log(`🚗 Socket Client Connected: ${socket.id}`);
  socket.emit('vehicle:connected', { socketId: socket.id, time: new Date() });

  socket.on('vehicle:message', (data) => {
    socket.broadcast.emit('vehicle:message', data);
  });

  socket.on('hazard:detected', (data) => {
    socket.broadcast.emit('hazard:detected', data);
  });

  socket.on('emergency:activated', (data) => {
    socket.broadcast.emit('emergency:activated', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Socket Client Disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`⚡ Rear Car Communicator Backend Server running on http://localhost:${PORT}`);
});
