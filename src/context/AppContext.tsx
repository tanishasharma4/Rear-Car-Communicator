import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Vehicle, 
  Hazard, 
  CommunicationEvent, 
  EmergencyState, 
  RiskAssessment,
  HardwareMessageType,
  HackathonDemoStep
} from '../types';
import { serialService } from '../services/serialService';
import { socketService } from '../services/socketService';
import { voiceService } from '../services/voiceService';

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  vehicle: Vehicle;
  hazards: Hazard[];
  communicationLog: CommunicationEvent[];
  emergencyState: EmergencyState;
  riskAssessment: RiskAssessment;
  isHardwareConnected: boolean;
  isDemoRunning: boolean;
  currentDemoStep: number;
  demoFlowName: string;
  speakEnabled: boolean;
  setSpeakEnabled: (val: boolean) => void;
  voiceLanguage: 'en' | 'hi' | 'dual';
  setVoiceLanguage: (lang: 'en' | 'hi' | 'dual') => void;
  
  // Actions
  setRearDisplayMessage: (msg: HardwareMessageType | string) => void;
  reportHazard: (hazard: Partial<Hazard>) => void;
  triggerEmergency: () => void;
  resolveEmergency: () => void;
  connectHardwareSerial: () => Promise<boolean>;
  simulateButtonPress: (button: 'PASS_LEFT' | 'PASS_RIGHT' | 'WAIT' | 'HELP') => void;
  startHackathonDemoFlow: (flowName: 'hazard' | 'overtaking' | 'emergency') => void;
  nextDemoStep: () => void;
  stopDemoFlow: () => void;
}

const initialVehicle: Vehicle = {
  id: 'RCC-001',
  name: 'Tesla Model Y — Rear Communicator Edition',
  speed: 48,
  latitude: 37.7749,
  longitude: -122.4194,
  status: 'SAFE',
  hardwareConnected: true,
  rearDisplayOnline: true,
  gpsAvailable: true,
  v2vConnected: true,
  aiActive: true,
  battery: 84,
  currentMessage: 'PASS FROM LEFT →',
};

const initialHazards: Hazard[] = [
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
    timestamp: '2 mins ago',
    status: 'CONFIRMED',
    aiReasoning: [
      'Pothole detected with 94% neural network confidence',
      'Positioned directly in primary driving lane trajectory',
      'Depth estimation indicates ~40 meters distance ahead',
      '8 independent vehicle corroborations in past 5 minutes'
    ]
  },
  {
    id: 'HAZ-102',
    type: 'construction',
    title: 'Lane Construction Barriers',
    description: 'Unannounced roadwork barriers obstructing right shoulder.',
    confidence: 91,
    distanceApproxMeters: 120,
    lanePosition: 'RIGHT LANE',
    severity: 'MODERATE',
    latitude: 37.7760,
    longitude: -122.4175,
    reportedByVehicleId: 'RCC-004',
    confirmationsCount: 3,
    timestamp: '8 mins ago',
    status: 'CONFIRMED',
  },
  {
    id: 'HAZ-103',
    type: 'animal',
    title: 'Stray Animal Crossing',
    description: 'Cattle near road median requiring cautious driving speed.',
    confidence: 89,
    distanceApproxMeters: 85,
    lanePosition: 'SHOULDER',
    severity: 'MODERATE',
    latitude: 37.7735,
    longitude: -122.4210,
    reportedByVehicleId: 'RCC-007',
    confirmationsCount: 2,
    timestamp: '15 mins ago',
    status: 'UNCONFIRMED',
  }
];

const initialCommEvents: CommunicationEvent[] = [
  {
    id: 'COMM-01',
    senderVehicleId: 'RCC-001',
    senderVehicleName: 'Your Vehicle',
    targetVehicleId: 'RCC-002',
    type: 'PASS_REQUEST',
    displayMessage: 'PASS FROM LEFT →',
    priority: 'P3',
    timestamp: '19:12:04',
    status: 'RECEIVED'
  },
  {
    id: 'COMM-02',
    senderVehicleId: 'RCC-009',
    senderVehicleName: 'Vehicle B (Follower)',
    type: 'HAZARD_WARNING',
    displayMessage: '⚠️ POTHOLE AHEAD — ~40m',
    priority: 'P2',
    timestamp: '19:10:15',
    status: 'ACKNOWLEDGED'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicle);
  const [hazards, setHazards] = useState<Hazard[]>(initialHazards);
  const [communicationLog, setCommunicationLog] = useState<CommunicationEvent[]>(initialCommEvents);
  const [isHardwareConnected, setIsHardwareConnected] = useState<boolean>(false);
  const [speakEnabled, setSpeakEnabled] = useState<boolean>(true);
  const [voiceLanguage, setVoiceLanguageState] = useState<'en' | 'hi' | 'dual'>('dual');

  const setVoiceLanguage = (lang: 'en' | 'hi' | 'dual') => {
    setVoiceLanguageState(lang);
    voiceService.setLanguage(lang);
  };

  const [emergencyState, setEmergencyState] = useState<EmergencyState>({
    active: false,
    vehicleId: 'RCC-001',
    latitude: 37.7749,
    longitude: -122.4194,
    nearbyAlertedCount: 6,
    incidentStatus: 'RESOLVED',
  });

  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment>({
    level: 'HIGH',
    score: 72,
    factors: [
      'Pothole in driving lane ~40m ahead',
      'Vehicle speed at 48 km/h',
      'High confidence (94%) with 8 vehicle confirmations'
    ],
    recommendation: 'Reduce speed and maintain safe following distance from vehicles behind.',
  });

  // Hackathon Demo State
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [currentDemoStep, setCurrentDemoStep] = useState<number>(1);
  const [demoFlowName, setDemoFlowName] = useState<'hazard' | 'overtaking' | 'emergency'>('hazard');

  // Hardware Serial Integration Listener
  useEffect(() => {
    const unsubscribe = serialService.onData((data) => {
      if (data.message) {
        setRearDisplayMessage(data.message);
      }
      if (data.button === 'HELP') {
        triggerEmergency();
      }
    });

    // Socket.IO Events Listener
    const unsubSocketMsg = socketService.subscribe('vehicle:message', (evt: CommunicationEvent) => {
      setCommunicationLog(prev => [evt, ...prev.slice(0, 19)]);
    });

    const unsubSocketHazard = socketService.subscribe('hazard:detected', (hz: Hazard) => {
      setHazards(prev => [hz, ...prev.filter(h => h.id !== hz.id)]);
    });

    return () => {
      unsubscribe();
      unsubSocketMsg();
      unsubSocketHazard();
    };
  }, []);

  const connectHardwareSerial = async (): Promise<boolean> => {
    const success = await serialService.connect();
    setIsHardwareConnected(success);
    setVehicle(prev => ({ ...prev, hardwareConnected: true, rearDisplayOnline: true }));
    return success;
  };

  const setRearDisplayMessage = (msg: HardwareMessageType | string) => {
    setVehicle(prev => ({ ...prev, currentMessage: msg }));
    
    // Broadcast over V2V network
    socketService.broadcastV2VMessage({
      senderVehicleId: vehicle.id,
      senderVehicleName: vehicle.name,
      displayMessage: msg,
      priority: msg.includes('EMERGENCY') ? 'P0' : msg.includes('POTHOLE') ? 'P2' : 'P3',
    });

    // Attempt hardware write if connected
    serialService.writeToDisplay(msg);
  };

  const simulateButtonPress = (button: 'PASS_LEFT' | 'PASS_RIGHT' | 'WAIT' | 'HELP') => {
    serialService.simulateHardwareButtonPress(button);
  };

  const reportHazard = (newHazard: Partial<Hazard>) => {
    const fullHazard: Hazard = {
      id: 'HAZ-' + Math.floor(100 + Math.random() * 900),
      type: newHazard.type || 'pothole',
      title: newHazard.title || 'Road Hazard Detected',
      description: newHazard.description || 'Hazard reported by driver or AI scanner.',
      confidence: newHazard.confidence || 94,
      distanceApproxMeters: newHazard.distanceApproxMeters || 40,
      lanePosition: newHazard.lanePosition || 'YOUR LANE',
      severity: newHazard.severity || 'HIGH',
      latitude: vehicle.latitude,
      longitude: vehicle.longitude,
      reportedByVehicleId: vehicle.id,
      confirmationsCount: 1,
      timestamp: 'Just now',
      status: 'CONFIRMED',
      aiReasoning: newHazard.aiReasoning || [
        'Detected by AI Computer Vision engine',
        'Directly in driving lane trajectory (~40m)',
        'Automatically broadcast to nearby V2V mesh'
      ]
    };

    setHazards(prev => [fullHazard, ...prev]);
    socketService.broadcastHazard(fullHazard);

    // Audio Voice Alert (Bilingual English + Hindi + Hinglish Phonetic)
    if (speakEnabled) {
      const engText = `${fullHazard.title} detected approximately ${fullHazard.distanceApproxMeters} meters ahead.`;
      const hindiDevanagari = `सावधान! आगे लगभग ${fullHazard.distanceApproxMeters} मीटर पर गड्ढा या खतरा है।`;
      const hindiPhonetic = `Savdhaan! Aage lagbhag ${fullHazard.distanceApproxMeters} meter par gaddha ya khatra hai.`;
      voiceService.speak(engText, hindiDevanagari, hindiPhonetic);
    }

    // V2V Alert
    setRearDisplayMessage(`⚠️ ${fullHazard.type.toUpperCase()} AHEAD`);
  };

  const triggerEmergency = () => {
    setEmergencyState({
      active: true,
      activatedAt: new Date().toLocaleTimeString(),
      vehicleId: vehicle.id,
      latitude: vehicle.latitude,
      longitude: vehicle.longitude,
      nearbyAlertedCount: 6,
      incidentStatus: 'ACTIVE',
    });

    setVehicle(prev => ({
      ...prev,
      status: 'EMERGENCY',
      currentMessage: '🚨 EMERGENCY — HELP'
    }));

    socketService.broadcastEmergency({
      vehicleId: vehicle.id,
      location: { lat: vehicle.latitude, lng: vehicle.longitude },
      timestamp: new Date().toISOString()
    });

    if (speakEnabled) {
      const engSos = "Emergency SOS activated. Alerting nearby vehicles and emergency control center.";
      const hindiDev = "आपत्कालीन SOS मदद चालू हो गई है। आस-पास की गाड़ियों को अलर्ट भेजा गया है।";
      const hindiPhonetic = "Aapkaaleen SOS madad chalu ho gayi hai. Aas-paas ki gaadiyon ko alert bheja gaya hai.";
      voiceService.speak(engSos, hindiDev, hindiPhonetic);
    }
  };

  const resolveEmergency = () => {
    setEmergencyState(prev => ({ ...prev, active: false, incidentStatus: 'RESOLVED' }));
    setVehicle(prev => ({ ...prev, status: 'SAFE', currentMessage: 'PASS FROM LEFT →' }));
  };

  // Hackathon 1-Click Guided Demo Flow Controls
  const startHackathonDemoFlow = (flowName: 'hazard' | 'overtaking' | 'emergency') => {
    setDemoFlowName(flowName);
    setIsDemoRunning(true);
    setCurrentDemoStep(1);
    executeDemoStep(flowName, 1);
  };

  const nextDemoStep = () => {
    const next = currentDemoStep + 1;
    if (next > 10) {
      stopDemoFlow();
      return;
    }
    setCurrentDemoStep(next);
    executeDemoStep(demoFlowName, next);
  };

  const stopDemoFlow = () => {
    setIsDemoRunning(false);
    setCurrentDemoStep(1);
  };

  const executeDemoStep = (flow: string, step: number) => {
    if (flow === 'hazard') {
      if (step === 1) setActiveTab('driver');
      if (step === 2) setActiveTab('vision');
      if (step === 3) reportHazard({ type: 'pothole', title: 'Deep Asphalt Pothole', distanceApproxMeters: 40, confidence: 94 });
      if (step === 4) setActiveTab('v2v');
      if (step === 5) setActiveTab('map');
    } else if (flow === 'overtaking') {
      if (step === 1) setActiveTab('driver');
      if (step === 2) {
        voiceService.speak("I want to overtake from the left");
        setRearDisplayMessage('PASS FROM LEFT →');
      }
      if (step === 3) setActiveTab('hardware');
      if (step === 4) setActiveTab('v2v');
    } else if (flow === 'emergency') {
      if (step === 1) setActiveTab('hardware');
      if (step === 2) simulateButtonPress('HELP');
      if (step === 3) setActiveTab('admin');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        vehicle,
        hazards,
        communicationLog,
        emergencyState,
        riskAssessment,
        isHardwareConnected,
        isDemoRunning,
        currentDemoStep,
        demoFlowName,
        speakEnabled,
        setSpeakEnabled,
        voiceLanguage,
        setVoiceLanguage,
        setRearDisplayMessage,
        reportHazard,
        triggerEmergency,
        resolveEmergency,
        connectHardwareSerial,
        simulateButtonPress,
        startHackathonDemoFlow,
        nextDemoStep,
        stopDemoFlow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
