import { Injectable, signal } from '@angular/core';

export interface Feeling {
  id: string;
  name: string;
  category: string;
  description: string;
  copingStrategies: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FeelingsService {
  
  private readonly STORAGE_KEY = 'gefuehls-kompass-state';
  
  // Available feelings organized by category
  readonly availableFeelings: Feeling[] = [
    // Angst (Fear)
    {
      id: 'angst',
      name: 'Angst',
      category: 'Grundemotionen',
      description: 'Angst ist ein natürliches Warnsignal und darf da sein. Sie hilft dir, Gefahren zu erkennen.',
      copingStrategies: [
        'Sich über die Situation informieren',
        'Sicherheit herstellen',
        'Ruhige Umgebung schaffen',
        'Tief und langsam atmen',
        'Entspannungsübungen'
      ]
    },
    {
      id: 'nervositaet',
      name: 'Nervosität',
      category: 'Angst',
      description: 'Nervosität zeigt, dass dir etwas wichtig ist. Sie ist ein Zeichen, dass du dir Sorgen machst.',
      copingStrategies: [
        'Atemübungen',
        'Sich bewegen oder gehen',
        'Positives Selbstgespräch',
        'Vorbereitung und Planung'
      ]
    },
    {
      id: 'ueberforderung',
      name: 'Überforderung',
      category: 'Stress',
      description: 'Überforderung signalisiert, dass zu viel auf einmal passiert. Du darfst Pausen machen.',
      copingStrategies: [
        'Prioritäten setzen',
        'Aufgaben in kleine Schritte unterteilen',
        'Um Hilfe bitten',
        'Pausenzeiten einplanen'
      ]
    },
    
    // Wut (Anger)
    {
      id: 'wut',
      name: 'Wut',
      category: 'Grundemotionen',
      description: 'Wut zeigt dir, dass deine Grenzen überschritten wurden. Sie hat eine wichtige Schutzfunktion.',
      copingStrategies: [
        'Körperliche Aktivität',
        'Laut ausatmen',
        'Schreiben oder zeichnen',
        'Laute Musik hören',
        'Boxsack oder Kissen schlagen'
      ]
    },
    {
      id: 'aerger',
      name: 'Ärger',
      category: 'Wut',
      description: 'Ärger ist eine mildere Form der Wut und zeigt, dass etwas nicht deinen Erwartungen entspricht.',
      copingStrategies: [
        'Die Situation durchdenken',
        'Mit jemandem darüber sprechen',
        'Einen Spaziergang machen',
        'Tief durchatmen'
      ]
    },
    
    // Traurigkeit (Sadness)
    {
      id: 'traurigkeit',
      name: 'Traurigkeit',
      category: 'Grundemotionen',
      description: 'Traurigkeit zeigt, dass dir etwas wichtig ist. Sie braucht Raum und Mitgefühl.',
      copingStrategies: [
        'Weinen zulassen',
        'Mit vertrauten Personen reden',
        'Musik hören',
        'Ein Tagebuch führen',
        'Sich selbst trösten'
      ]
    },
    {
      id: 'einsamkeit',
      name: 'Einsamkeit',
      category: 'Traurigkeit',
      description: 'Einsamkeit zeigt dein Bedürfnis nach Verbindung. Du bist nicht allein mit diesem Gefühl.',
      copingStrategies: [
        'Freunde oder Familie kontaktieren',
        'Gemeinschaftsaktivitäten suchen',
        'Haustiere streicheln',
        'Online-Communities beitreten'
      ]
    },
    {
      id: 'verzweiflung',
      name: 'Verzweiflung',
      category: 'Traurigkeit',
      description: 'Verzweiflung ist ein intensives Gefühl der Hoffnungslosigkeit. Es ist wichtig, Hilfe zu suchen.',
      copingStrategies: [
        'Professionelle Hilfe suchen',
        'Mit vertrauten Personen sprechen',
        'Kleine, erreichbare Ziele setzen',
        'Selbstfürsorge praktizieren'
      ]
    },
    
    // Scham und Schuld
    {
      id: 'scham',
      name: 'Scham',
      category: 'Selbstwert',
      description: 'Scham betrifft dein Selbstbild. Du bist wertvoll, auch wenn du Fehler machst.',
      copingStrategies: [
        'Selbstmitgefühl üben',
        'Mit vertrauenswürdigen Personen sprechen',
        'Perfektionismus loslassen',
        'Positive Selbstaffirmationen'
      ]
    },
    {
      id: 'schuld',
      name: 'Schuld',
      category: 'Selbstwert',
      description: 'Schuldgefühle zeigen deine Werte und dein Gewissen. Sie können zu Veränderung motivieren.',
      copingStrategies: [
        'Die Situation ehrlich betrachten',
        'Entschuldigen, wenn nötig',
        'Aus Fehlern lernen',
        'Sich selbst vergeben'
      ]
    },
    {
      id: 'ohnmacht',
      name: 'Ohnmacht',
      category: 'Kontrolle',
      description: 'Ohnmacht zeigt, dass du dich hilflos fühlst. Du hast mehr Einfluss, als du denkst.',
      copingStrategies: [
        'Kontrolle über kleine Dinge übernehmen',
        'Unterstützung suchen',
        'Fokus auf das Machbare legen',
        'Geduld mit sich haben'
      ]
    },
    
    // Positive Gefühle
    {
      id: 'hoffnung',
      name: 'Hoffnung',
      category: 'Positive Gefühle',
      description: 'Hoffnung ist ein kostbares Gefühl. Sie gibt dir Kraft für die Zukunft.',
      copingStrategies: [
        'Hoffnung nähren durch kleine Schritte',
        'Positive Visionen entwickeln',
        'Dankbarkeit praktizieren',
        'Sich an vergangene Erfolge erinnern'
      ]
    },
    {
      id: 'dankbarkeit',
      name: 'Dankbarkeit',
      category: 'Positive Gefühle',
      description: 'Dankbarkeit öffnet das Herz und verbindet dich mit dem Guten in deinem Leben.',
      copingStrategies: [
        'Ein Dankbarkeitstagebuch führen',
        'Anderen Dankbarkeit ausdrücken',
        'Bewusst das Schöne wahrnehmen',
        'Kleine Freuden feiern'
      ]
    },
    {
      id: 'erleichterung',
      name: 'Erleichterung',
      category: 'Positive Gefühle',
      description: 'Erleichterung zeigt, dass eine belastende Situation vorüber ist. Geniesse diesen Moment.',
      copingStrategies: [
        'Den Moment bewusst wahrnehmen',
        'Durchatmen und entspannen',
        'Die Erfahrung würdigen',
        'Sich selbst loben'
      ]
    },
    {
      id: 'freude',
      name: 'Freude',
      category: 'Grundemotionen',
      description: 'Freude ist ein wunderbares Geschenk. Du darfst sie voll auskosten.',
      copingStrategies: [
        'Die Freude bewusst spüren',
        'Mit anderen teilen',
        'Den Moment fotografieren oder notieren',
        'Dankbar sein'
      ]
    }
  ];
  
  // Signal for selected feelings
  selectedFeelings = signal<Feeling[]>([]);
  
  // Signal for current step
  currentStep = signal<number>(1);
  
  constructor() {
    this.loadFromStorage();
  }
  
  // Methods for managing selected feelings
  toggleFeeling(feeling: Feeling): void {
    const current = this.selectedFeelings();
    const index = current.findIndex(f => f.id === feeling.id);
    
    if (index >= 0) {
      // Remove feeling
      const updated = current.filter(f => f.id !== feeling.id);
      this.selectedFeelings.set(updated);
    } else {
      // Add feeling
      this.selectedFeelings.set([...current, feeling]);
    }
    
    this.saveToStorage();
  }
  
  isFeelingSelected(feeling: Feeling): boolean {
    return this.selectedFeelings().some(f => f.id === feeling.id);
  }
  
  clearSelectedFeelings(): void {
    this.selectedFeelings.set([]);
    this.saveToStorage();
  }
  
  // Step management
  setCurrentStep(step: number): void {
    this.currentStep.set(step);
    this.saveToStorage();
  }
  
  // Get feelings by category
  getFeelingsByCategory(): { [category: string]: Feeling[] } {
    return this.availableFeelings.reduce((acc, feeling) => {
      if (!acc[feeling.category]) {
        acc[feeling.category] = [];
      }
      acc[feeling.category].push(feeling);
      return acc;
    }, {} as { [category: string]: Feeling[] });
  }
  
  // Storage methods
  private saveToStorage(): void {
    const state = {
      selectedFeelings: this.selectedFeelings(),
      currentStep: this.currentStep()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }
  
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const state = JSON.parse(stored);
        if (state.selectedFeelings) {
          this.selectedFeelings.set(state.selectedFeelings);
        }
        if (state.currentStep) {
          this.currentStep.set(state.currentStep);
        }
      }
    } catch (error) {
      console.warn('Could not load state from localStorage:', error);
    }
  }
  
  // Reset everything
  reset(): void {
    this.selectedFeelings.set([]);
    this.currentStep.set(1);
    this.saveToStorage();
  }
}
