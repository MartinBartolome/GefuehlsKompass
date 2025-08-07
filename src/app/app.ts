import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeelingsService } from './services/feelings';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Gefühls-Kompass');
  
  private feelingsService = inject(FeelingsService);
  private router = inject(Router);
  
  protected readonly currentStep = this.feelingsService.currentStep;
  
  private hasCheckedInitialRoute = false;
  
  ngOnInit() {
    // Listen for navigation end events to detect when we're on a non-home route after app initialization
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // On the first navigation after app initialization, check if we need to redirect to home
        if (!this.hasCheckedInitialRoute) {
          this.hasCheckedInitialRoute = true;
          
          if (event.url !== '/' && event.url !== '') {
            // Reset the feelings service state and navigate to home
            this.feelingsService.reset();
            this.router.navigate(['/']);
          }
        }
      });
  }
}
