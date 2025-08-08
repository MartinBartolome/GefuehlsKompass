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
  
  // Available feelings organized by category (based on emotion wheel structure)
  readonly availableFeelings: Feeling[] = [
    // Grundemotionen (Basic Emotions) - Core emotions from emotion wheel
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
      id: 'ueberraschung',
      name: 'Überraschung',
      category: 'Grundemotionen',
      description: 'Überraschung öffnet dich für neue Erfahrungen. Sie ist der erste Schritt zum Lernen.',
      copingStrategies: [
        'Neugierig bleiben',
        'Zeit zum Verarbeiten nehmen',
        'Die Erfahrung würdigen',
        'Sich für Unerwartetes öffnen'
      ]
    },
    {
      id: 'ekel',
      name: 'Ekel',
      category: 'Grundemotionen',
      description: 'Ekel schützt dich vor Schädlichem. Er hilft dir, Grenzen zu ziehen.',
      copingStrategies: [
        'Die Grenze respektieren',
        'Distanz schaffen',
        'Sich selbst schützen',
        'Die eigenen Werte klären'
      ]
    },
    {
      id: 'vertrauen',
      name: 'Vertrauen',
      category: 'Grundemotionen',
      description: 'Vertrauen öffnet dein Herz für Verbindung. Es ist der Grundstein für Beziehungen.',
      copingStrategies: [
        'Kleine Schritte des Vertrauens wagen',
        'Vergangene positive Erfahrungen erinnern',
        'Offene Kommunikation führen',
        'Eigene Intuition vertrauen'
      ]
    },
    {
      id: 'erwartung',
      name: 'Erwartung',
      category: 'Grundemotionen',
      description: 'Erwartung richtet dich auf die Zukunft aus. Sie kann motivieren und antreiben.',
      copingStrategies: [
        'Realistische Erwartungen setzen',
        'Flexibel bleiben',
        'Den Weg genießen, nicht nur das Ziel',
        'Alternative Szenarien durchdenken'
      ]
    },

    // Angst-Familie (Fear Family)
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
      id: 'panik',
      name: 'Panik',
      category: 'Angst',
      description: 'Panik ist eine intensive Angstreaktion. Sie ist zeitlich begrenzt und wird vorübergehen.',
      copingStrategies: [
        'Sich auf die Atmung konzentrieren',
        'Eine sichere Position einnehmen',
        '5-4-3-2-1 Technik anwenden',
        'Professionelle Hilfe suchen bei wiederkehrender Panik'
      ]
    },
    {
      id: 'sorge',
      name: 'Sorge',
      category: 'Angst',
      description: 'Sorgen zeigen deine Fürsorge für andere oder für die Zukunft. Sie können auch überwältigend werden.',
      copingStrategies: [
        'Zwischen begründeten und unbegründeten Sorgen unterscheiden',
        'Lösungen für beeinflussbare Probleme suchen',
        'Sich auf das Hier und Jetzt konzentrieren',
        'Entspannungstechniken anwenden'
      ]
    },
    {
      id: 'unruhe',
      name: 'Unruhe',
      category: 'Angst',
      description: 'Unruhe ist ein Gefühl innerer Anspannung. Sie kann ein Zeichen für unerfüllte Bedürfnisse sein.',
      copingStrategies: [
        'Körperliche Bewegung',
        'Meditation oder Achtsamkeitsübungen',
        'Die Ursache der Unruhe erforschen',
        'Beruhigende Aktivitäten finden'
      ]
    },
    {
      id: 'furcht',
      name: 'Furcht',
      category: 'Angst',
      description: 'Furcht ist eine tiefere Form der Angst vor einer konkreten Bedrohung.',
      copingStrategies: [
        'Die Bedrohung realistisch einschätzen',
        'Schutzmaßnahmen ergreifen',
        'Unterstützung suchen',
        'Bewältigungsstrategien entwickeln'
      ]
    },

    // Wut-Familie (Anger Family)
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
    {
      id: 'frustration',
      name: 'Frustration',
      category: 'Wut',
      description: 'Frustration entsteht, wenn Hindernisse deine Ziele blockieren. Sie kann zur Veränderung motivieren.',
      copingStrategies: [
        'Alternative Wege suchen',
        'Realistische Ziele setzen',
        'Geduld mit sich haben',
        'Erfolge würdigen, auch kleine'
      ]
    },
    {
      id: 'irritation',
      name: 'Irritation',
      category: 'Wut',
      description: 'Irritation ist ein mildes Unbehagen über störende Faktoren in deiner Umgebung.',
      copingStrategies: [
        'Die Störquelle wenn möglich beseitigen',
        'Toleranz entwickeln',
        'Pausen einlegen',
        'Humor finden'
      ]
    },
    {
      id: 'verachtung',
      name: 'Verachtung',
      category: 'Wut',
      description: 'Verachtung entsteht bei starker Ablehnung von Verhalten oder Werten anderer.',
      copingStrategies: [
        'Eigene Werte reflektieren',
        'Empathie für andere Perspektiven entwickeln',
        'Gesunde Grenzen setzen',
        'Auf Respekt im Umgang achten'
      ]
    },
    {
      id: 'rage',
      name: 'Rage',
      category: 'Wut',
      description: 'Rage ist eine intensive Form der Wut. Sie braucht einen sicheren Ausdruck.',
      copingStrategies: [
        'Sich und andere schützen',
        'Intensive körperliche Aktivität',
        'Professionelle Hilfe suchen',
        'Auslöser identifizieren und bearbeiten'
      ]
    },

    // Traurigkeit-Familie (Sadness Family)
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
    {
      id: 'melancholie',
      name: 'Melancholie',
      category: 'Traurigkeit',
      description: 'Melancholie ist eine nachdenkliche, schwermütige Stimmung. Sie kann auch schöpferisch sein.',
      copingStrategies: [
        'Kreative Ausdrucksformen finden',
        'Die Stimmung bewusst wahrnehmen',
        'Schöne Erinnerungen aufrufen',
        'Sanfte Selbstfürsorge praktizieren'
      ]
    },
    {
      id: 'kummer',
      name: 'Kummer',
      category: 'Traurigkeit',
      description: 'Kummer ist ein tiefes Gefühl des Schmerzes, oft durch Verlust oder Enttäuschung.',
      copingStrategies: [
        'Trauer zulassen und durchleben',
        'Unterstützung von Liebsten annehmen',
        'Rituale des Gedenkens schaffen',
        'Geduld mit dem Heilungsprozess haben'
      ]
    },
    {
      id: 'bedauern',
      name: 'Bedauern',
      category: 'Traurigkeit',
      description: 'Bedauern entsteht durch Reue über vergangene Entscheidungen oder verpasste Chancen.',
      copingStrategies: [
        'Aus der Erfahrung lernen',
        'Sich selbst vergeben',
        'Fokus auf die Gegenwart richten',
        'Neue Chancen erkennen'
      ]
    },

    // Freude-Familie (Joy Family)
    {
      id: 'glueck',
      name: 'Glück',
      category: 'Freude',
      description: 'Glück ist ein tiefes Gefühl der Zufriedenheit und des Wohlbefindens.',
      copingStrategies: [
        'Das Glück bewusst genießen',
        'Dankbarkeit kultivieren',
        'Glücksmomente festhalten',
        'Mit anderen teilen'
      ]
    },
    {
      id: 'begeisterung',
      name: 'Begeisterung',
      category: 'Freude',
      description: 'Begeisterung ist lebendige Freude und Leidenschaft für etwas. Sie kann ansteckend wirken.',
      copingStrategies: [
        'Die Energie nutzen für positive Aktionen',
        'Andere mit der Begeisterung anstecken',
        'Projekte starten oder vorantreiben',
        'Die Leidenschaft pflegen'
      ]
    },
    {
      id: 'ekstase',
      name: 'Ekstase',
      category: 'Freude',
      description: 'Ekstase ist ein Zustand intensivster Freude und Verzückung.',
      copingStrategies: [
        'Den Moment voll auskosten',
        'Sich erden nach intensiven Erfahrungen',
        'Die Erfahrung in Erinnerung behalten',
        'Dankbar für besondere Momente sein'
      ]
    },
    {
      id: 'zufriedenheit',
      name: 'Zufriedenheit',
      category: 'Freude',
      description: 'Zufriedenheit ist ein ruhiges, ausgeglichenes Gefühl des Friedens mit der aktuellen Situation.',
      copingStrategies: [
        'Die innere Ruhe schätzen',
        'Dankbarkeit für das Erreichte',
        'Den Moment bewusst wahrnehmen',
        'Zufriedenheit als Kraftquelle nutzen'
      ]
    },
    {
      id: 'heiterkeit',
      name: 'Heiterkeit',
      category: 'Freude',
      description: 'Heiterkeit ist eine leichte, unbeschwerte Form der Freude.',
      copingStrategies: [
        'Lachen und Humor pflegen',
        'Leichtigkeit im Alltag finden',
        'Spielerisch an Dinge herangehen',
        'Positive Energie teilen'
      ]
    },

    // Überraschung-Familie (Surprise Family)
    {
      id: 'erstaunen',
      name: 'Erstaunen',
      category: 'Überraschung',
      description: 'Erstaunen ist ein Gefühl des Verwundertseins über etwas Unerwartetes.',
      copingStrategies: [
        'Neugier bewahren',
        'Das Unerwartete als Chance sehen',
        'Flexibilität entwickeln',
        'Staunen als Bereicherung empfinden'
      ]
    },
    {
      id: 'verwirrung',
      name: 'Verwirrung',
      category: 'Überraschung',
      description: 'Verwirrung entsteht, wenn Situationen nicht den Erwartungen entsprechen.',
      copingStrategies: [
        'Informationen sammeln',
        'Nach Klarheit suchen',
        'Geduld mit Ungewissheit haben',
        'Um Erklärungen bitten'
      ]
    },
    {
      id: 'verwunderung',
      name: 'Verwunderung',
      category: 'Überraschung',
      description: 'Verwunderung ist ein mildes Erstaunen über ungewöhnliche Ereignisse.',
      copingStrategies: [
        'Das Besondere wahrnehmen',
        'Offenheit für Neues bewahren',
        'Fragen stellen',
        'Wunder des Alltags entdecken'
      ]
    },

    // Ekel-Familie (Disgust Family)
    {
      id: 'abscheu',
      name: 'Abscheu',
      category: 'Ekel',
      description: 'Abscheu ist eine starke Abneigung gegen etwas, das als widerlich empfunden wird.',
      copingStrategies: [
        'Sichere Distanz halten',
        'Eigene Grenzen respektieren',
        'Alternative Wege finden',
        'Werte und Prinzipien klären'
      ]
    },
    {
      id: 'widerwille',
      name: 'Widerwille',
      category: 'Ekel',
      description: 'Widerwille ist eine natürliche Abneigung gegen bestimmte Dinge oder Situationen.',
      copingStrategies: [
        'Die Abneigung akzeptieren',
        'Alternative Optionen suchen',
        'Grenzen kommunizieren',
        'Selbstschutz praktizieren'
      ]
    },

    // Vertrauen-Familie (Trust Family)
    {
      id: 'akzeptanz',
      name: 'Akzeptanz',
      category: 'Vertrauen',
      description: 'Akzeptanz ist die Bereitschaft, Situationen anzunehmen, wie sie sind.',
      copingStrategies: [
        'Widerstand loslassen',
        'Das Unveränderliche annehmen',
        'Inneren Frieden finden',
        'Auf Veränderungsmöglichkeiten fokussieren'
      ]
    },
    {
      id: 'bewunderung',
      name: 'Bewunderung',
      category: 'Vertrauen',
      description: 'Bewunderung ist ein Gefühl der Wertschätzung für besondere Qualitäten oder Leistungen.',
      copingStrategies: [
        'Inspiration aus Bewunderung ziehen',
        'Positive Eigenschaften würdigen',
        'Von anderen lernen',
        'Eigene Entwicklung fördern'
      ]
    },
    {
      id: 'zuversicht',
      name: 'Zuversicht',
      category: 'Vertrauen',
      description: 'Zuversicht ist ein optimistisches Vertrauen in positive Entwicklungen.',
      copingStrategies: [
        'Positive Gedanken nähren',
        'Auf eigene Stärken vertrauen',
        'Erfolge aus der Vergangenheit erinnern',
        'Hoffnung kultivieren'
      ]
    },

    // Erwartung-Familie (Anticipation Family)
    {
      id: 'interesse',
      name: 'Interesse',
      category: 'Erwartung',
      description: 'Interesse ist ein neugieriges Verlangen, mehr über etwas zu erfahren.',
      copingStrategies: [
        'Neugier als Motivation nutzen',
        'Aktiv erkunden und lernen',
        'Fragen stellen',
        'Wissen erweitern'
      ]
    },
    {
      id: 'vorfreude',
      name: 'Vorfreude',
      category: 'Erwartung',
      description: 'Vorfreude ist die Freude auf etwas Kommendes. Sie kann die Gegenwart bereichern.',
      copingStrategies: [
        'Die Vorfreude bewusst genießen',
        'Pläne und Träume pflegen',
        'Geduld mit dem Timing haben',
        'Den Weg zum Ziel wertschätzen'
      ]
    },
    {
      id: 'spannung',
      name: 'Spannung',
      category: 'Erwartung',
      description: 'Spannung ist ein Zustand erhöhter Aufmerksamkeit und Erwartung.',
      copingStrategies: [
        'Die Spannung als Energie nutzen',
        'Entspannungstechniken anwenden',
        'Fokus auf das Positive richten',
        'Ablenkung bei übermäßiger Anspannung'
      ]
    },

    // Stress und Überforderung
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
    {
      id: 'erschoepfung',
      name: 'Erschöpfung',
      category: 'Stress',
      description: 'Erschöpfung zeigt, dass deine Energiereserven aufgebraucht sind. Erholung ist notwendig.',
      copingStrategies: [
        'Ausreichend schlafen',
        'Energiequellen identifizieren',
        'Belastung reduzieren',
        'Regenerative Aktivitäten planen'
      ]
    },
    {
      id: 'anspannung',
      name: 'Anspannung',
      category: 'Stress',
      description: 'Anspannung ist körperliche und mentale Verspannung, oft durch Stress verursacht.',
      copingStrategies: [
        'Progressive Muskelentspannung',
        'Atemübungen',
        'Meditation oder Yoga',
        'Stressoren identifizieren und reduzieren'
      ]
    },

    // Selbstwert-Familie
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
      id: 'stolz',
      name: 'Stolz',
      category: 'Selbstwert',
      description: 'Stolz ist ein positives Gefühl der Anerkennung für eigene Leistungen oder Eigenschaften.',
      copingStrategies: [
        'Erfolge bewusst würdigen',
        'Selbstvertrauen stärken',
        'Bescheidenheit bewahren',
        'Motivation für weitere Ziele nutzen'
      ]
    },
    {
      id: 'selbstzweifel',
      name: 'Selbstzweifel',
      category: 'Selbstwert',
      description: 'Selbstzweifel können lähmend wirken, aber auch zur Selbstreflexion anregen.',
      copingStrategies: [
        'Eigene Stärken erinnern',
        'Realistische Selbsteinschätzung',
        'Unterstützung von vertrauten Personen',
        'Kleine Erfolge sammeln'
      ]
    },

    // Kontrolle-Familie
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
    {
      id: 'hilflosigkeit',
      name: 'Hilflosigkeit',
      category: 'Kontrolle',
      description: 'Hilflosigkeit ist das Gefühl, keinen Einfluss auf die Situation zu haben.',
      copingStrategies: [
        'Kleine kontrollierbare Schritte finden',
        'Professionelle Hilfe suchen',
        'Unterstützungsnetzwerk aktivieren',
        'Selbstwirksamkeit in anderen Bereichen erleben'
      ]
    },
    {
      id: 'kontrollverlust',
      name: 'Kontrollverlust',
      category: 'Kontrolle',
      description: 'Kontrollverlust kann beängstigend sein, aber auch zu neuen Perspektiven führen.',
      copingStrategies: [
        'Loslassen üben',
        'Flexibilität entwickeln',
        'Vertrauen in den Prozess',
        'Unterstützung annehmen'
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
      id: 'optimismus',
      name: 'Optimismus',
      category: 'Positive Gefühle',
      description: 'Optimismus ist die Tendenz, das Beste in Situationen zu sehen und zu erwarten.',
      copingStrategies: [
        'Positive Aspekte bewusst wahrnehmen',
        'Lösungen statt Probleme fokussieren',
        'Hoffnung in schwierigen Zeiten kultivieren',
        'Positive Gedanken verstärken'
      ]
    },
    {
      id: 'gelassenheit',
      name: 'Gelassenheit',
      category: 'Positive Gefühle',
      description: 'Gelassenheit ist ein Zustand innerer Ruhe und Ausgeglichenheit.',
      copingStrategies: [
        'Meditation und Achtsamkeit praktizieren',
        'Perspektive bewahren',
        'Akzeptanz für Unveränderliches entwickeln',
        'Innere Balance pflegen'
      ]
    },
    {
      id: 'liebe',
      name: 'Liebe',
      category: 'Positive Gefühle',
      description: 'Liebe ist das stärkste positive Gefühl und schafft tiefe Verbindungen.',
      copingStrategies: [
        'Liebe bewusst ausdrücken',
        'Selbstliebe praktizieren',
        'Verbindungen zu anderen pflegen',
        'Liebe als Kraftquelle nutzen'
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
