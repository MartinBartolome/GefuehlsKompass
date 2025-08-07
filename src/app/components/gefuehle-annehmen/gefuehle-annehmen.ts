import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeelingsService } from '../../services/feelings';

@Component({
  selector: 'app-gefuehle-annehmen',
  imports: [CommonModule],
  templateUrl: './gefuehle-annehmen.html',
  styleUrl: './gefuehle-annehmen.css'
})
export class GefuehleAnnehmen {
  
  private router = inject(Router);
  private feelingsService = inject(FeelingsService);
  
  selectedFeelings = this.feelingsService.selectedFeelings;
  
  // Breathing exercise state
  breathingActive = false;
  breathingPhase: 'inhale' | 'hold' | 'exhale' = 'inhale';
  breathingCounter = 0;
  private breathingInterval?: number;
  
  // Affirmations and quotes
  positiveAffirmations = [
    "Du bist stark und kannst mit schwierigen Gefühlen umgehen.",
    "Deine Gefühle sind valid und verdienen Aufmerksamkeit.",
    "Es ist mutig, deine Gefühle zu erkennen und anzunehmen.",
    "Du bist nicht allein mit dem, was du fühlst.",
    "Jedes Gefühl hat seine Berechtigung und darf da sein.",
    "Du machst gerade einen wichtigen Schritt der Selbstfürsorge."
  ];
  
  selectedAffirmation = this.positiveAffirmations[0];
  
  breathingInstructions = {
    inhale: { text: "Einatmen", duration: 4, color: "#4a90e2" },
    hold: { text: "Halten", duration: 4, color: "#28a745" },
    exhale: { text: "Ausatmen", duration: 6, color: "#20c997" }
  };
  
  ngOnInit() {
    this.feelingsService.setCurrentStep(2);
    
    // Redirect if no feelings selected
    if (this.selectedFeelings().length === 0) {
      this.router.navigate(['/gefuehle-erkennen']);
    }
  }
  
  ngOnDestroy() {
    this.stopBreathingExercise();
  }
  
  startBreathingExercise() {
    this.breathingActive = true;
    this.breathingPhase = 'inhale';
    this.breathingCounter = this.breathingInstructions.inhale.duration;
    this.runBreathingCycle();
  }
  
  stopBreathingExercise() {
    this.breathingActive = false;
    if (this.breathingInterval) {
      clearInterval(this.breathingInterval);
    }
  }
  
  private runBreathingCycle() {
    this.breathingInterval = setInterval(() => {
      this.breathingCounter--;
      
      if (this.breathingCounter <= 0) {
        this.moveToNextPhase();
      }
    }, 1000);
  }
  
  private moveToNextPhase() {
    switch (this.breathingPhase) {
      case 'inhale':
        this.breathingPhase = 'hold';
        this.breathingCounter = this.breathingInstructions.hold.duration;
        break;
      case 'hold':
        this.breathingPhase = 'exhale';
        this.breathingCounter = this.breathingInstructions.exhale.duration;
        break;
      case 'exhale':
        this.breathingPhase = 'inhale';
        this.breathingCounter = this.breathingInstructions.inhale.duration;
        break;
    }
  }
  
  getCurrentInstruction() {
    return this.breathingInstructions[this.breathingPhase];
  }
  
  getRandomAffirmation(): string {
    return this.selectedAffirmation;
  }
  
  proceedToNextStep() {
    this.feelingsService.setCurrentStep(3);
    this.router.navigate(['/gefuehle-bewaeltigen']);
  }
  
  goBack() {
    this.router.navigate(['/gefuehle-erkennen']);
  }
}
