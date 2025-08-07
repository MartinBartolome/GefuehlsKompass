import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeelingsService } from '../../services/feelings';

@Component({
  selector: 'app-gefuehle-bewaeltigen',
  imports: [CommonModule],
  templateUrl: './gefuehle-bewaeltigen.html',
  styleUrl: './gefuehle-bewaeltigen.css'
})
export class GefuehleBewaeltigen {
  
  private router = inject(Router);
  private feelingsService = inject(FeelingsService);
  
  selectedFeelings = this.feelingsService.selectedFeelings;
  
  // General coping strategies
  generalStrategies = [
    {
      title: "Progressive Muskelentspannung",
      description: "Spanne verschiedene Muskelgruppen an und entspanne sie bewusst.",
      steps: [
        "Setze oder lege dich bequem hin",
        "Beginne mit den Zehen, spanne sie 5 Sekunden an",
        "Entspanne und spüre den Unterschied",
        "Arbeite dich langsam nach oben vor",
        "Geniesse das Gefühl der Entspannung"
      ]
    },
    {
      title: "5-4-3-2-1 Achtsamkeitstechnik",
      description: "Eine Übung, um im gegenwärtigen Moment anzukommen.",
      steps: [
        "Benenne 5 Dinge, die du siehst",
        "Benenne 4 Dinge, die du hörst",
        "Benenne 3 Dinge, die du berühren kannst",
        "Benenne 2 Dinge, die du riechst",
        "Benenne 1 Ding, das du schmeckst"
      ]
    },
    {
      title: "Geführte Selbstreflexion",
      description: "Stelle dir diese Fragen und nimm dir Zeit für die Antworten.",
      steps: [
        "Was brauche ich gerade am meisten?",
        "Welche Unterstützung könnte mir helfen?",
        "Was sind drei Dinge, für die ich dankbar bin?",
        "Welcher kleine Schritt würde mir heute guttun?",
        "Wie kann ich liebevoll mit mir selbst umgehen?"
      ]
    }
  ];
  
  ngOnInit() {
    this.feelingsService.setCurrentStep(3);
    
    // Redirect if no feelings selected
    if (this.selectedFeelings().length === 0) {
      this.router.navigate(['/gefuehle-erkennen']);
    }
  }
  
  restartJourney() {
    this.feelingsService.reset();
    this.router.navigate(['/']);
  }
  
  goBack() {
    this.router.navigate(['/gefuehle-annehmen']);
  }
}
