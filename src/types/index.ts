export type HazardType = 
  | 'pothole'
  | 'accident'
  | 'construction'
  | 'animal'
  | 'fallen_object'
  | 'road_barrier'
  | 'flooded_road'
  | 'vehicle_breakdown';

export type HazardSeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type PriorityLevel = 'P0' | 'P1' | 'P2' | 'P3';

export type HardwareMessageType = 
  | 'PASS FROM LEFT →'
  | '← PASS FROM RIGHT'
  | 'WAIT'
  | 'HELP'
  | '🚨 EMERGENCY — HELP'
  | '⚠️ POTHOLE AHEAD'
  | '🛑 VEHICLE STOPPING'
  | '🚧 OBSTACLE AHEAD';

export interface Vehicle {
  id: string;
  name: string;
  speed: number;
  latitude: number;
  longitude: number;
  status: 'SAFE' | 'MODERATE' | 'HIGH_RISK' | 'EMERGENCY';
  hardwareConnected: boolean;
  rearDisplayOnline: boolean;
  gpsAvailable: boolean;
  v2vConnected: boolean;
  aiActive: boolean;
  battery: number;
  currentMessage: string;
}

export interface Hazard {
  id: string;
  type: HazardType;
  title: string;
  description: string;
  confidence: number; // percentage e.g. 94
  distanceApproxMeters: number; // e.g. 40
  lanePosition: 'YOUR LANE' | 'LEFT LANE' | 'RIGHT LANE' | 'SHOULDER';
  severity: HazardSeverity;
  latitude: number;
  longitude: number;
  reportedByVehicleId: string;
  confirmationsCount: number;
  timestamp: string;
  status: 'UNCONFIRMED' | 'CONFIRMED' | 'RESOLVED';
  imageUrl?: string;
  aiReasoning?: string[];
}

export interface CommunicationEvent {
  id: string;
  senderVehicleId: string;
  senderVehicleName: string;
  targetVehicleId?: string;
  type: string;
  displayMessage: string;
  priority: PriorityLevel;
  timestamp: string;
  status: 'TRANSMITTING' | 'RECEIVED' | 'ACKNOWLEDGED';
  hazardDetails?: Partial<Hazard>;
}

export interface AIDetection {
  id: string;
  label: string;
  type: HazardType | 'vehicle' | 'motorcycle' | 'pedestrian' | 'traffic_signal';
  confidence: number;
  distanceApproxMeters: number;
  lanePosition: 'YOUR LANE' | 'LEFT LANE' | 'RIGHT LANE' | 'SHOULDER';
  severity: HazardSeverity;
  box: { x: number; y: number; w: number; h: number };
}

export interface RiskAssessment {
  level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  score: number; // 0 to 100
  factors: string[];
  recommendation: string;
}

export interface EmergencyState {
  active: boolean;
  activatedAt?: string;
  vehicleId: string;
  latitude: number;
  longitude: number;
  nearbyAlertedCount: number;
  incidentStatus: 'ACTIVE' | 'RESPONDED' | 'RESOLVED';
}

export interface HackathonDemoStep {
  step: number;
  title: string;
  subtitle: string;
  actionDesc: string;
  activeComponent: 'vision' | 'hardware' | 'v2v' | 'map' | 'emergency';
}
