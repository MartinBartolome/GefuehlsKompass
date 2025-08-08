import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeelingsService, Feeling } from '../../services/feelings';

@Component({
  selector: 'app-gefuehle-erkennen',
  imports: [CommonModule],
  templateUrl: './gefuehle-erkennen.html',
  styleUrl: './gefuehle-erkennen.css'
})
export class GefuehleErkennen {
  
  private router = inject(Router);
  private feelingsService = inject(FeelingsService);
  
  // Get feelings organized by category
  feelingsByCategory = this.feelingsService.getFeelingsByCategory();
  
  // Get selected feelings
  selectedFeelings = this.feelingsService.selectedFeelings;
  
  ngOnInit() {
    this.feelingsService.setCurrentStep(1);
  }
  
  toggleFeeling(feeling: Feeling) {
    this.feelingsService.toggleFeeling(feeling);
  }
  
  isFeelingSelected(feeling: Feeling): boolean {
    return this.feelingsService.isFeelingSelected(feeling);
  }
  
  canProceed(): boolean {
    return this.selectedFeelings().length > 0;
  }
  
  proceedToNextStep() {
    if (this.canProceed()) {
      this.feelingsService.setCurrentStep(2);
      this.router.navigate(['/gefuehle-annehmen']).then(() => {
        // Ensure page scrolls to top
        window.scrollTo(0, 0);
      });
    }
  }
  
  goBack() {
    this.router.navigate(['/']).then(() => {
      // Ensure page scrolls to top
      window.scrollTo(0, 0);
    });
  }
}
