// Web Serial API & ESP32 115200 bps Serial Monitor Service

export type SerialConsoleCallback = (log: { time: string; level: 'INFO' | 'WARN' | 'INTERRUPT' | 'TX'; text: string }) => void;
export type SerialDataCallback = (data: { button: string; message: string; raw: string; gpioPin: number }) => void;

class SerialService {
  private port: any = null;
  private reader: any = null;
  private isConnected: boolean = false;
  private dataCallbacks: SerialDataCallback[] = [];
  private consoleCallbacks: SerialConsoleCallback[] = [];

  public isSupported(): boolean {
    return 'serial' in navigator;
  }

  public getIsConnected(): boolean {
    return this.isConnected;
  }

  public onData(callback: SerialDataCallback): () => void {
    this.dataCallbacks.push(callback);
    return () => {
      this.dataCallbacks = this.dataCallbacks.filter(cb => cb !== callback);
    };
  }

  public onConsole(callback: SerialConsoleCallback): () => void {
    this.consoleCallbacks.push(callback);
    return () => {
      this.consoleCallbacks = this.consoleCallbacks.filter(cb => cb !== callback);
    };
  }

  private emitConsole(level: 'INFO' | 'WARN' | 'INTERRUPT' | 'TX', text: string) {
    const log = {
      time: new Date().toLocaleTimeString() + '.' + Math.floor(Math.random() * 900 + 100),
      level,
      text,
    };
    this.consoleCallbacks.forEach(cb => cb(log));
  }

  public async connect(): Promise<boolean> {
    if (!this.isSupported()) {
      this.emitConsole('WARN', '[ESP32 Web Serial API missing] Falling back to Web Simulation Engine (115200 bps).');
      return false;
    }

    try {
      this.port = await (navigator as any).serial.requestPort();
      await this.port.open({ baudRate: 115200 });
      this.isConnected = true;
      this.emitConsole('INFO', '[ESP32 USB Serial Connected] Baud Rate: 115200 bps | RX/TX Lines Active');
      this.startReading();
      return true;
    } catch (err) {
      this.emitConsole('WARN', '[Serial Connect Failed] Using ESP32 Software Simulator.');
      this.isConnected = false;
      return false;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.reader) {
      try { await this.reader.cancel(); } catch (e) {}
    }
    if (this.port) {
      try { await this.port.close(); } catch (e) {}
    }
    this.isConnected = false;
    this.emitConsole('INFO', '[ESP32 USB Serial Disconnected]');
  }

  public async writeToDisplay(messageText: string): Promise<boolean> {
    this.emitConsole('TX', `[MAX7219/P5 RGB LED] Writing string payload: "${messageText}"`);

    if (!this.isConnected || !this.port || !this.port.writable) {
      return false;
    }

    try {
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);
      const writer = textEncoder.writable.getWriter();
      await writer.write(messageText + '\n');
      writer.releaseLock();
      return true;
    } catch (err) {
      this.emitConsole('WARN', `[Serial TX Error] Write failed: ${err}`);
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
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed) {
                this.handleIncomingLine(trimmed);
              }
            }
          }
        }
      } catch (error) {
        this.emitConsole('WARN', `Serial Read Exception: ${error}`);
      } finally {
        this.reader.releaseLock();
      }
    }
  }

  private handleIncomingLine(line: string) {
    let button = '';
    let message = '';
    let gpioPin = 14;

    if (line.includes('PASS_LEFT')) { button = 'PASS_LEFT'; gpioPin = 14; message = 'PASS FROM LEFT →'; }
    else if (line.includes('PASS_RIGHT')) { button = 'PASS_RIGHT'; gpioPin = 27; message = '← PASS FROM RIGHT'; }
    else if (line.includes('WAIT')) { button = 'WAIT'; gpioPin = 26; message = 'WAIT'; }
    else if (line.includes('HELP')) { button = 'HELP'; gpioPin = 32; message = '🚨 EMERGENCY — HELP'; }

    this.emitConsole('INTERRUPT', `[GPIO ${gpioPin}] ISR Triggered -> Active LOW | Btn: ${button}`);
    this.dataCallbacks.forEach(cb => cb({ button, message, raw: line, gpioPin }));
  }

  public simulateHardwareButtonPress(buttonName: 'PASS_LEFT' | 'PASS_RIGHT' | 'WAIT' | 'HELP') {
    let message = '';
    let gpioPin = 14;
    switch (buttonName) {
      case 'PASS_LEFT': message = 'PASS FROM LEFT →'; gpioPin = 14; break;
      case 'PASS_RIGHT': message = '← PASS FROM RIGHT'; gpioPin = 27; break;
      case 'WAIT': message = 'WAIT'; gpioPin = 26; break;
      case 'HELP': message = '🚨 EMERGENCY — HELP'; gpioPin = 32; break;
    }

    this.emitConsole('INTERRUPT', `[ESP32 ISR GPIO ${gpioPin}] Interrupt Triggered -> Btn: ${buttonName}`);
    this.emitConsole('TX', `[ESP-NOW Radio] Broadcasting Hex Payload over 2.4GHz Wi-Fi MAC Mesh`);

    this.dataCallbacks.forEach(cb => cb({ button: buttonName, message, raw: `SIM_INTERRUPT:GPIO_${gpioPin}`, gpioPin }));
  }
}

export const serialService = new SerialService();
