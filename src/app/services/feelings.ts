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
    
    // Erweiterte Angst-Gefühle
    {
      id: 'besorgnis',
      name: 'Besorgnis',
      category: 'Angst',
      description: 'Besorgnis zeigt deine Fürsorge für dich und andere. Sie ist ein Zeichen deiner Achtsamkeit.',
      copingStrategies: [
        'Fakten von Befürchtungen trennen',
        'Realistische Lösungen suchen',
        'Mit vertrauten Personen sprechen',
        'Achtsamkeitsübungen praktizieren'
      ]
    },
    {
      id: 'panik',
      name: 'Panik',
      category: 'Angst',
      description: 'Panik ist eine intensive Angstreaktion. Du bist in Sicherheit, auch wenn es sich anders anfühlt.',
      copingStrategies: [
        '4-7-8 Atemtechnik anwenden',
        'Grounding-Techniken nutzen',
        'Sich an einem sicheren Ort aufhalten',
        'Professionelle Hilfe suchen'
      ]
    },
    {
      id: 'furcht',
      name: 'Furcht',
      category: 'Angst',
      description: 'Furcht vor konkreten Bedrohungen ist natürlich und schützt dich vor Gefahren.',
      copingStrategies: [
        'Die Bedrohung realistisch einschätzen',
        'Sicherheitsmaßnahmen ergreifen',
        'Unterstützung suchen',
        'Schritt für Schritt vorgehen'
      ]
    },

    // Erweiterte Wut-Gefühle
    {
      id: 'frustration',
      name: 'Frustration',
      category: 'Wut',
      description: 'Frustration entsteht, wenn Dinge nicht wie geplant verlaufen. Das ist völlig normal.',
      copingStrategies: [
        'Pausen einlegen',
        'Das Problem aus neuer Perspektive betrachten',
        'Kleine Erfolge feiern',
        'Geduld mit sich selbst haben'
      ]
    },
    {
      id: 'irritation',
      name: 'Irritation',
      category: 'Wut',
      description: 'Irritation zeigt, dass etwas deine Aufmerksamkeit braucht oder verändert werden sollte.',
      copingStrategies: [
        'Die Ursache der Irritation identifizieren',
        'Kurz durchatmen',
        'Die Situation analysieren',
        'Konstruktive Lösungen suchen'
      ]
    },
    {
      id: 'empoerung',
      name: 'Empörung',
      category: 'Wut',
      description: 'Empörung zeigt dein starkes Gerechtigkeitsgefühl. Sie kann zu positivem Wandel motivieren.',
      copingStrategies: [
        'Konstruktive Wege des Protests finden',
        'Mit Gleichgesinnten vernetzen',
        'Aktiv werden für deine Werte',
        'Die Energie positiv kanalisieren'
      ]
    },

    // Erweiterte Traurigkeits-Gefühle
    {
      id: 'melancholie',
      name: 'Melancholie',
      category: 'Traurigkeit',
      description: 'Melancholie ist eine nachdenkliche Form der Traurigkeit. Sie kann zu tiefen Einsichten führen.',
      copingStrategies: [
        'Die Gedanken und Gefühle reflektieren',
        'Kreative Ausdrucksformen nutzen',
        'Zeit in der Natur verbringen',
        'Schöne Erinnerungen pflegen'
      ]
    },
    {
      id: 'kummer',
      name: 'Kummer',
      category: 'Traurigkeit',
      description: 'Kummer über Verluste ist ein natürlicher Heilungsprozess. Lass dir die Zeit, die du brauchst.',
      copingStrategies: [
        'Den Verlust bewusst betrauern',
        'Unterstützung von Nahestehenden annehmen',
        'Rituale des Abschieds gestalten',
        'Professionelle Trauerbegleitung suchen'
      ]
    },
    {
      id: 'niedergeschlagenheit',
      name: 'Niedergeschlagenheit',
      category: 'Traurigkeit',
      description: 'Niedergeschlagenheit zeigt, dass du Ruhe und Erholung brauchst. Sei geduldig mit dir.',
      copingStrategies: [
        'Kleine, erreichbare Ziele setzen',
        'Tageslicht und frische Luft suchen',
        'Selbstfürsorge praktizieren',
        'Bei anhaltender Niedergeschlagenheit Hilfe suchen'
      ]
    },

    // Neue Kategorie: Vertrauen (Trust)
    {
      id: 'vertrauen',
      name: 'Vertrauen',
      category: 'Vertrauen',
      description: 'Vertrauen ist die Grundlage für Beziehungen und persönliches Wachstum.',
      copingStrategies: [
        'Vertrauen schrittweise aufbauen',
        'Eigene Intuition stärken',
        'Positive Erfahrungen sammeln',
        'Offene Kommunikation pflegen'
      ]
    },
    {
      id: 'akzeptanz',
      name: 'Akzeptanz',
      category: 'Vertrauen',
      description: 'Akzeptanz bringt Frieden und ermöglicht Veränderung. Du musst nicht alles kontrollieren.',
      copingStrategies: [
        'Das Unveränderliche annehmen',
        'Auf das Beeinflussbare fokussieren',
        'Achtsamkeit praktizieren',
        'Selbstmitgefühl entwickeln'
      ]
    },
    {
      id: 'bewunderung',
      name: 'Bewunderung',
      category: 'Vertrauen',
      description: 'Bewunderung zeigt deine Fähigkeit, das Gute in anderen zu sehen und zu schätzen.',
      copingStrategies: [
        'Bewunderung aussprechen',
        'Von anderen lernen',
        'Eigene Stärken erkennen',
        'Dankbarkeit für Vorbilder entwickeln'
      ]
    },

    // Neue Kategorie: Ekel (Disgust)
    {
      id: 'ekel',
      name: 'Ekel',
      category: 'Abneigung',
      description: 'Ekel schützt dich vor schädlichen Dingen. Er zeigt deine Werte und Grenzen auf.',
      copingStrategies: [
        'Die Quelle des Ekels identifizieren',
        'Abstand zur Situation schaffen',
        'Eigene Werte reflektieren',
        'Bei übermäßigem Ekel professionelle Hilfe suchen'
      ]
    },
    {
      id: 'abscheu',
      name: 'Abscheu',
      category: 'Abneigung',
      description: 'Abscheu zeigt eine starke moralische Reaktion. Er spiegelt deine tiefsten Werte wider.',
      copingStrategies: [
        'Die eigenen Werte klären',
        'Konstruktive Handlungen überlegen',
        'Sich von schädlichen Einflüssen distanzieren',
        'Positive Alternativen suchen'
      ]
    },
    {
      id: 'verachtung',
      name: 'Verachtung',
      category: 'Abneigung',
      description: 'Verachtung entsteht bei starken Wertkonflikten. Prüfe, ob sie berechtigt ist.',
      copingStrategies: [
        'Die Berechtigung der Verachtung hinterfragen',
        'Empathie für andere entwickeln',
        'Konstruktive Kritik üben',
        'Eigene Vorurteile reflektieren'
      ]
    },

    // Neue Kategorie: Überraschung (Surprise)
    {
      id: 'ueberraschung',
      name: 'Überraschung',
      category: 'Überraschung',
      description: 'Überraschung öffnet dich für neue Erfahrungen und hält das Leben spannend.',
      copingStrategies: [
        'Offen für Unerwartetes bleiben',
        'Neugier entwickeln',
        'Flexibilität üben',
        'Positive Überraschungen wertschätzen'
      ]
    },
    {
      id: 'erstaunen',
      name: 'Erstaunen',
      category: 'Überraschung',
      description: 'Erstaunen zeigt deine Fähigkeit, die Wunder des Lebens wahrzunehmen.',
      copingStrategies: [
        'Staunen bewusst zulassen',
        'Neugier auf die Welt kultivieren',
        'Zeit für Entdeckungen einplanen',
        'Ehrfurcht vor dem Leben entwickeln'
      ]
    },
    {
      id: 'verwirrung',
      name: 'Verwirrung',
      category: 'Überraschung',
      description: 'Verwirrung zeigt, dass du neue Informationen verarbeitest. Das ist ein Lernprozess.',
      copingStrategies: [
        'Zeit zum Verstehen einräumen',
        'Fragen stellen',
        'Informationen sortieren',
        'Geduld mit dem Lernprozess haben'
      ]
    },

    // Neue Kategorie: Erwartung (Anticipation)
    {
      id: 'erwartung',
      name: 'Erwartung',
      category: 'Erwartung',
      description: 'Erwartung zeigt deine Zukunftsorientierung und kann motivierend wirken.',
      copingStrategies: [
        'Realistische Erwartungen setzen',
        'Enttäuschungen als Teil des Lebens akzeptieren',
        'Den Weg zum Ziel würdigen',
        'Flexibel auf Veränderungen reagieren'
      ]
    },
    {
      id: 'neugier',
      name: 'Neugier',
      category: 'Erwartung',
      description: 'Neugier ist der Motor für Lernen und Wachstum. Sie hält dich lebendig.',
      copingStrategies: [
        'Fragen stellen und erforschen',
        'Neue Erfahrungen suchen',
        'Offen für Antworten bleiben',
        'Wissensdurst stillen'
      ]
    },
    {
      id: 'vorfreude',
      name: 'Vorfreude',
      category: 'Erwartung',
      description: 'Vorfreude verdoppelt die Freude. Sie zeigt deine Fähigkeit, das Gute zu erwarten.',
      copingStrategies: [
        'Die Vorfreude bewusst genießen',
        'Positive Erwartungen pflegen',
        'Den Moment der Vorfreude auskosten',
        'Dankbarkeit für kommende Ereignisse'
      ]
    },

    // Neue Kategorie: Komplexe Gefühle
    {
      id: 'eifersucht',
      name: 'Eifersucht',
      category: 'Komplexe Gefühle',
      description: 'Eifersucht zeigt deine Ängste um Verlust und Wertschätzung. Sie verdient Verständnis.',
      copingStrategies: [
        'Die zugrundeliegenden Ängste erkunden',
        'Selbstwert stärken',
        'Vertrauen aufbauen',
        'Offene Kommunikation führen'
      ]
    },
    {
      id: 'neid',
      name: 'Neid',
      category: 'Komplexe Gefühle',
      description: 'Neid zeigt deine Wünsche und kann zu positiver Veränderung motivieren.',
      copingStrategies: [
        'Eigene Wünsche identifizieren',
        'Dankbarkeit für das Eigene entwickeln',
        'Von anderen lernen',
        'Eigene Ziele verfolgen'
      ]
    },
    {
      id: 'nostalgie',
      name: 'Nostalgie',
      category: 'Komplexe Gefühle',
      description: 'Nostalgie verbindet dich mit wertvollen Erinnerungen und zeigt, was dir wichtig ist.',
      copingStrategies: [
        'Schöne Erinnerungen pflegen',
        'Gegenwart bewusst gestalten',
        'Neue positive Erfahrungen sammeln',
        'Balance zwischen Vergangenheit und Gegenwart finden'
      ]
    },
    {
      id: 'reue',
      name: 'Reue',
      category: 'Komplexe Gefühle',
      description: 'Reue zeigt dein Gewissen und kann zu positiven Veränderungen führen.',
      copingStrategies: [
        'Aus Fehlern lernen',
        'Wiedergutmachung überlegen',
        'Sich selbst vergeben',
        'Zukünftige Entscheidungen bewusster treffen'
      ]
    },

    // Erweiterte Positive Gefühle
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
    },
    {
      id: 'euphorie',
      name: 'Euphorie',
      category: 'Positive Gefühle',
      description: 'Euphorie ist intensive Freude. Genieße sie, aber bleibe auch geerdet.',
      copingStrategies: [
        'Die intensive Freude bewusst erleben',
        'Mit vertrauten Personen teilen',
        'Den Moment festhalten',
        'Balance zwischen Hochgefühl und Realität halten'
      ]
    },
    {
      id: 'zufriedenheit',
      name: 'Zufriedenheit',
      category: 'Positive Gefühle',
      description: 'Zufriedenheit ist ein ruhiges, stabiles Glück. Sie zeigt inneren Frieden.',
      copingStrategies: [
        'Die Zufriedenheit bewusst wahrnehmen',
        'Dankbarkeit für das Erreichte empfinden',
        'Den gegenwärtigen Moment schätzen',
        'Inneren Frieden pflegen'
      ]
    },
    {
      id: 'begeisterung',
      name: 'Begeisterung',
      category: 'Positive Gefühle',
      description: 'Begeisterung ist ansteckende Freude und Motivation. Sie treibt dich zu Höchstleistungen.',
      copingStrategies: [
        'Die Begeisterung mit anderen teilen',
        'Energie für wichtige Projekte nutzen',
        'Motivation in Handlung umsetzen',
        'Begeisterungsfähigkeit pflegen'
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
