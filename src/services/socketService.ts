import { io, Socket } from 'socket.io-client';
import { CommunicationEvent, Hazard, PriorityLevel } from '../types';

type Listener = (data: any) => void;

class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  private listeners: Map<string, Listener[]> = new Map();

  constructor() {
    this.initSocket();
  }

  private initSocket() {
    try {
      this.socket = io('http://localhost:5000', {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        timeout: 3000,
      });

      this.socket.on('connect', () => {
        console.log('⚡ Connected to Rear Car Communicator Socket.IO server');
        this.isConnected = true;
        this.emitLocal('connection:status', true);
      });

      this.socket.on('disconnect', () => {
        console.log('🔌 Disconnected from Socket.IO server. Running in local V2V mesh simulation mode.');
        this.isConnected = false;
        this.emitLocal('connection:status', false);
      });

      // Forward socket events to internal listeners
      this.socket.on('vehicle:message', (data) => this.emitLocal('vehicle:message', data));
      this.socket.on('hazard:detected', (data) => this.emitLocal('hazard:detected', data));
      this.socket.on('hazard:confirmed', (data) => this.emitLocal('hazard:confirmed', data));
      this.socket.on('emergency:activated', (data) => this.emitLocal('emergency:activated', data));
    } catch (err) {
      console.warn('Socket server offline. Using local V2V simulation mesh.');
      this.isConnected = false;
    }
  }

  public getIsConnected(): boolean {
    return this.isConnected;
  }

  public subscribe(event: string, callback: Listener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);

    return () => {
      const list = this.listeners.get(event);
      if (list) {
        this.listeners.set(event, list.filter(cb => cb !== callback));
      }
    };
  }

  private emitLocal(event: string, data: any) {
    const list = this.listeners.get(event);
    if (list) {
      list.forEach(cb => cb(data));
    }
  }

  // Broadcast a V2V message from Vehicle A to nearby vehicles
  public broadcastV2VMessage(event: {
    senderVehicleId: string;
    senderVehicleName: string;
    displayMessage: string;
    priority: PriorityLevel;
    hazardDetails?: Partial<Hazard>;
  }) {
    const commEvent: CommunicationEvent = {
      id: 'COMM-' + Math.random().toString(36).substring(2, 9),
      senderVehicleId: event.senderVehicleId,
      senderVehicleName: event.senderVehicleName,
      type: event.displayMessage.includes('PASS') ? 'PASS_REQUEST' : event.displayMessage.includes('EMERGENCY') ? 'EMERGENCY' : 'HAZARD_ALERT',
      displayMessage: event.displayMessage,
      priority: event.priority,
      timestamp: new Date().toLocaleTimeString(),
      status: 'TRANSMITTING',
      hazardDetails: event.hazardDetails,
    };

    if (this.socket && this.isConnected) {
      this.socket.emit('vehicle:message', commEvent);
    }

    // Always emit locally for immediate UI update & simulation
    setTimeout(() => {
      commEvent.status = 'RECEIVED';
      this.emitLocal('vehicle:message', commEvent);
    }, 400);

    return commEvent;
  }

  // Broadcast hazard detected by AI
  public broadcastHazard(hazard: Hazard) {
    if (this.socket && this.isConnected) {
      this.socket.emit('hazard:detected', hazard);
    }
    this.emitLocal('hazard:detected', hazard);
  }

  // Broadcast emergency HELP activation
  public broadcastEmergency(emergencyData: any) {
    if (this.socket && this.isConnected) {
      this.socket.emit('emergency:activated', emergencyData);
    }
    this.emitLocal('emergency:activated', emergencyData);
  }
}

export const socketService = new SocketService();
