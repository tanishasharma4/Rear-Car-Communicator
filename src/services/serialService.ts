// Web Serial API Service for Arduino / ESP32 Hardware Integration

export type SerialCallback = (data: { button: string; message: string; raw: string }) => void;

class SerialService {
  private port: any = null;
  private reader: any = null;
  private isConnected: boolean = false;
  private callbacks: SerialCallback[] = [];

  // Check if Web Serial API is supported in browser
  public isSupported(): boolean {
    return 'serial' in navigator;
  }

  public getIsConnected(): boolean {
    return this.isConnected;
  }

  public onData(callback: SerialCallback): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  // Connect to physical hardware via USB Serial
  public async connect(): Promise<boolean> {
    if (!this.isSupported()) {
      console.warn('Web Serial API is not supported in this browser. Using simulation mode.');
      return false;
    }

    try {
      // Request serial port from user
      this.port = await (navigator as any).serial.requestPort();
      await this.port.open({ baudRate: 9600 });
      this.isConnected = true;
      this.startReading();
      return true;
    } catch (err) {
      console.error('Failed to connect to Serial Port:', err);
      this.isConnected = false;
      return false;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.reader) {
      try {
        await this.reader.cancel();
      } catch (e) {
        console.error(e);
      }
    }
    if (this.port) {
      try {
        await this.port.close();
      } catch (e) {
        console.error(e);
      }
    }
    this.isConnected = false;
  }

  // Send message from Web App down to physical hardware LED display over USB
  public async writeToDisplay(messageText: string): Promise<boolean> {
    if (!this.isConnected || !this.port || !this.port.writable) {
      return false; // Hardware not connected, fallback to simulation UI
    }

    try {
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);
      const writer = textEncoder.writable.getWriter();
      await writer.write(messageText + '\n');
      writer.releaseLock();
      return true;
    } catch (err) {
      console.error('Error writing to hardware display:', err);
      return false;
    }
  }

  private async startReading() {
    while (this.port && this.port.readable && this.isConnected) {
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
      this.reader = textDecoder.readable.getReader();

      try {
        let buffer = '';
        while (true) {
          const { value, done } = await this.reader.read();
          if (done) break;
          if (value) {
            buffer += value;
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed) {
                this.handleIncomingLine(trimmed);
              }
            }
          }
        }
      } catch (error) {
        console.error('Serial read error:', error);
      } finally {
        this.reader.releaseLock();
      }
    }
  }

  private handleIncomingLine(line: string) {
    // Expected Arduino format: "BTN:PASS_LEFT" or JSON "{"button":"PASS_LEFT"}"
    let button = '';
    let message = '';

    if (line.startsWith('BTN:')) {
      button = line.replace('BTN:', '');
    } else if (line.includes('PASS_LEFT')) button = 'PASS_LEFT';
    else if (line.includes('PASS_RIGHT')) button = 'PASS_RIGHT';
    else if (line.includes('WAIT')) button = 'WAIT';
    else if (line.includes('HELP')) button = 'HELP';

    switch (button) {
      case 'PASS_LEFT': message = 'PASS FROM LEFT →'; break;
      case 'PASS_RIGHT': message = '← PASS FROM RIGHT'; break;
      case 'WAIT': message = 'WAIT'; break;
      case 'HELP': message = '🚨 EMERGENCY — HELP'; break;
      default: message = line;
    }

    this.callbacks.forEach(cb => cb({ button, message, raw: line }));
  }

  // Demo simulator trigger method for testing physical button click
  public simulateHardwareButtonPress(buttonName: 'PASS_LEFT' | 'PASS_RIGHT' | 'WAIT' | 'HELP') {
    let message = '';
    switch (buttonName) {
      case 'PASS_LEFT': message = 'PASS FROM LEFT →'; break;
      case 'PASS_RIGHT': message = '← PASS FROM RIGHT'; break;
      case 'WAIT': message = 'WAIT'; break;
      case 'HELP': message = '🚨 EMERGENCY — HELP'; break;
    }
    this.callbacks.forEach(cb => cb({ button: buttonName, message, raw: `SIMULATED_BTN:${buttonName}` }));
  }
}

export const serialService = new SerialService();
