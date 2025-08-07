import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FeelingsService } from '../../services/feelings';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
  private router = inject(Router);
  private feelingsService = inject(FeelingsService);
  
  ngOnInit() {
    // Set step to 0 for home page
    this.feelingsService.setCurrentStep(0);
  }
  
  startJourney() {
    this.feelingsService.reset();
    this.feelingsService.setCurrentStep(1);
    this.router.navigate(['/gefuehle-erkennen']).then(() => {
      // Ensure page scrolls to top
      window.scrollTo(0, 0);
    });
  }
}
