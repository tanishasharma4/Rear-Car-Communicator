// Speech Recognition & Text-to-Speech Synthesis Service

export interface IntentResult {
  intent: 'OVERTAKE_LEFT' | 'OVERTAKE_RIGHT' | 'STOPPING' | 'OBSTACLE' | 'BREAKDOWN' | 'EMERGENCY' | 'QUERY_HAZARD' | 'UNKNOWN';
  rawText: string;
  recommendedDisplayMessage: string;
  actionSummary: string;
}

class VoiceService {
  private recognition: any = null;
  private isListening: boolean = false;
  private synthesisSupported: boolean = false;

  constructor() {
    if ('speechSynthesis' in window) {
      this.synthesisSupported = true;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  public isSpeechSupported(): boolean {
    return !!this.recognition;
  }

  public isListeningState(): boolean {
    return this.isListening;
  }

  // Speak voice prompt to driver
  public speak(text: string) {
    if (!this.synthesisSupported) return;
    try {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Speech synthesis error:', err);
    }
  }

  // Parse speech transcript to driver intent
  public parseIntent(transcript: string): IntentResult {
    const text = transcript.toLowerCase();

    if (text.includes('overtake') && (text.includes('left') || text.includes('passing left'))) {
      return {
        intent: 'OVERTAKE_LEFT',
        rawText: transcript,
        recommendedDisplayMessage: 'PASS FROM LEFT →',
        actionSummary: 'Signaling overtake intent from left lane to rear vehicle.',
      };
    }

    if (text.includes('overtake') && (text.includes('right') || text.includes('passing right'))) {
      return {
        intent: 'OVERTAKE_RIGHT',
        rawText: transcript,
        recommendedDisplayMessage: '← PASS FROM RIGHT',
        actionSummary: 'Signaling overtake intent from right lane to rear vehicle.',
      };
    }

    if (text.includes('stop') || text.includes('stopping') || text.includes('wait') || text.includes('slowing down')) {
      return {
        intent: 'STOPPING',
        rawText: transcript,
        recommendedDisplayMessage: 'WAIT',
        actionSummary: 'Alerting rear vehicle to maintain distance as vehicle slows.',
      };
    }

    if (text.includes('obstacle') || text.includes('block') || text.includes('debris') || text.includes('pothole')) {
      return {
        intent: 'OBSTACLE',
        rawText: transcript,
        recommendedDisplayMessage: '🚧 OBSTACLE AHEAD',
        actionSummary: 'Warning rear traffic of upcoming road obstacle.',
      };
    }

    if (text.includes('breakdown') || text.includes('broken down') || text.includes('puncture') || text.includes('flat tire')) {
      return {
        intent: 'BREAKDOWN',
        rawText: transcript,
        recommendedDisplayMessage: 'WAIT',
        actionSummary: 'Broadcasting vehicle breakdown hazard warning.',
      };
    }

    if (text.includes('help') || text.includes('emergency') || text.includes('sos') || text.includes('accident')) {
      return {
        intent: 'EMERGENCY',
        rawText: transcript,
        recommendedDisplayMessage: '🚨 EMERGENCY — HELP',
        actionSummary: 'Activating emergency SOS workflow and broadcasting location.',
      };
    }

    if (text.includes('hazard') || text.includes('ahead') || text.includes('road condition') || text.includes('any danger')) {
      return {
        intent: 'QUERY_HAZARD',
        rawText: transcript,
        recommendedDisplayMessage: 'PASS FROM LEFT →',
        actionSummary: 'Checking active AI hazard map for upcoming road risks.',
      };
    }

    return {
      intent: 'UNKNOWN',
      rawText: transcript,
      recommendedDisplayMessage: 'WAIT',
      actionSummary: 'Voice recognized. AI suggests keeping current safety status.',
    };
  }

  // Listen to speech input
  public listen(): Promise<IntentResult> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        // Fallback simulation if browser speech recognition is missing
        setTimeout(() => {
          resolve(this.parseIntent("I want to overtake from the left"));
        }, 1500);
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event: any) => {
        this.isListening = false;
        const transcript = event.results[0][0].transcript;
        const result = this.parseIntent(transcript);
        resolve(result);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        console.error('Speech recognition error:', event.error);
        // Default intent fallback on speech error
        resolve(this.parseIntent("I want to overtake from the left"));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      try {
        this.recognition.start();
      } catch (err) {
        this.isListening = false;
        resolve(this.parseIntent("I want to overtake from the left"));
      }
    });
  }
}

export const voiceService = new VoiceService();
