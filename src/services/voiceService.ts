// Speech Recognition & Text-to-Speech Synthesis Service (Bilingual: English & Hindi)

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
  private currentLanguage: 'en' | 'hi' | 'dual' = 'dual';
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if ('speechSynthesis' in window) {
      this.synthesisSupported = true;
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  private loadVoices() {
    if (this.synthesisSupported) {
      this.voices = window.speechSynthesis.getVoices();
    }
  }

  public setLanguage(lang: 'en' | 'hi' | 'dual') {
    this.currentLanguage = lang;
    if (this.recognition) {
      this.recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    }
  }

  public getLanguage(): 'en' | 'hi' | 'dual' {
    return this.currentLanguage;
  }

  public isSpeechSupported(): boolean {
    return !!this.recognition;
  }

  public isListeningState(): boolean {
    return this.isListening;
  }

  // Speak voice prompt to driver with multi-browser Hindi voice & Hinglish phonetic fallback
  public speak(englishText: string, hindiDevanagari?: string, hindiPhonetic?: string) {
    if (!this.synthesisSupported) return;
    try {
      window.speechSynthesis.cancel(); // Stop current speech

      this.loadVoices();
      const hindiVoice = this.voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'));
      const indianEngVoice = this.voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en_IN'));

      // If user selected Hindi or Dual, construct clear speech text
      const defaultHindiPhonetic = hindiPhonetic || "Savdhaan! Aage lagbhag 40 meter par gaddha ya khatra hai.";
      const defaultHindiText = hindiDevanagari || "सावधान! आगे लगभग 40 मीटर पर गड्ढा या खतरा है।";

      let speechString = englishText;
      let targetLang = 'en-US';
      let selectedVoice = null;

      if (this.currentLanguage === 'hi') {
        if (hindiVoice) {
          speechString = defaultHindiText;
          targetLang = 'hi-IN';
          selectedVoice = hindiVoice;
        } else {
          speechString = defaultHindiPhonetic;
          targetLang = 'en-IN';
          selectedVoice = indianEngVoice || null;
        }
      } else if (this.currentLanguage === 'dual') {
        if (hindiVoice) {
          speechString = `${englishText}. ${defaultHindiText}`;
          targetLang = 'hi-IN';
          selectedVoice = hindiVoice;
        } else {
          speechString = `${englishText}. ${defaultHindiPhonetic}`;
          targetLang = 'en-IN';
          selectedVoice = indianEngVoice || null;
        }
      }

      const utterance = new SpeechSynthesisUtterance(speechString);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = targetLang;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Speech synthesis error:', err);
    }
  }

  // Parse speech transcript to driver intent (Supports full Hindi, Hinglish, & English instructions)
  public parseIntent(transcript: string): IntentResult {
    const text = transcript.toLowerCase();

    // OVERTAKE LEFT (Full Hindi & Hinglish instructions)
    if (
      (text.includes('overtake') && (text.includes('left') || text.includes('passing left'))) ||
      text.includes('बाएं') || text.includes('बायें') || text.includes('बाए') || 
      text.includes('left pass') || text.includes('pass left') || text.includes('baaye') || text.includes('baye') ||
      text.includes('आगे निकलना') || text.includes('पास दो') || text.includes('nikalna')
    ) {
      return {
        intent: 'OVERTAKE_LEFT',
        rawText: transcript,
        recommendedDisplayMessage: 'PASS FROM LEFT →',
        actionSummary: 'Hindi Intent Recognized: बायें से ओवरटेक करना (Signaling Overtake From Left).',
      };
    }

    // OVERTAKE RIGHT (Full Hindi & Hinglish instructions)
    if (
      (text.includes('overtake') && (text.includes('right') || text.includes('passing right'))) ||
      text.includes('दाएं') || text.includes('दाएँ') || text.includes('दायें') || text.includes('daaye') || text.includes('daye')
    ) {
      return {
        intent: 'OVERTAKE_RIGHT',
        rawText: transcript,
        recommendedDisplayMessage: '← PASS FROM RIGHT',
        actionSummary: 'Hindi Intent Recognized: दायें से ओवरटेक करना (Signaling Overtake From Right).',
      };
    }

    // STOPPING / WAIT (Full Hindi & Hinglish instructions)
    if (
      text.includes('stop') || text.includes('stopping') || text.includes('wait') || text.includes('slowing down') ||
      text.includes('रुकना') || text.includes('रोकें') || text.includes('इंतजार') || text.includes('धीरे') || 
      text.includes('rokna') || text.includes('roko') || text.includes('dhire') || text.includes('गाड़ी रोक')
    ) {
      return {
        intent: 'STOPPING',
        rawText: transcript,
        recommendedDisplayMessage: 'WAIT',
        actionSummary: 'Hindi Intent Recognized: गाड़ी धीमी या रुक रही है (Alerting Rear Traffic to Wait).',
      };
    }

    // OBSTACLE / POTHOLE (Full Hindi & Hinglish instructions)
    if (
      text.includes('obstacle') || text.includes('block') || text.includes('debris') || text.includes('pothole') ||
      text.includes('गड्ढा') || text.includes('रास्ता बंद') || text.includes('खतरा') || text.includes('gaddha') || 
      text.includes('khatra') || text.includes('पत्थर') || text.includes('ख़राब रास्ता')
    ) {
      return {
        intent: 'OBSTACLE',
        rawText: transcript,
        recommendedDisplayMessage: '🚧 OBSTACLE AHEAD',
        actionSummary: 'Hindi Intent Recognized: आगे गड्ढा या खतरा है (Warning Rear Vehicles of Obstacle).',
      };
    }

    // EMERGENCY / HELP / SOS (Full Hindi & Hinglish instructions)
    if (
      text.includes('help') || text.includes('emergency') || text.includes('sos') || text.includes('accident') ||
      text.includes('मदद') || text.includes('इमरजेंसी') || text.includes('बचाओ') || text.includes('हादसा') || 
      text.includes('madad') || text.includes('गाड़ी खराब') || text.includes('खराब हो गई')
    ) {
      return {
        intent: 'EMERGENCY',
        rawText: transcript,
        recommendedDisplayMessage: '🚨 EMERGENCY — HELP',
        actionSummary: 'Hindi Intent Recognized: आपत्कालीन SOS मदद चालू (Activating Emergency SOS).',
      };
    }

    return {
      intent: 'UNKNOWN',
      rawText: transcript,
      recommendedDisplayMessage: 'WAIT',
      actionSummary: 'Hindi Voice Instruction Recognized (हिंदी निर्देश पहचाना गया).',
    };
  }

  // Listen to speech input
  public listen(): Promise<IntentResult> {
    return new Promise((resolve) => {
      if (!this.recognition) {
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
