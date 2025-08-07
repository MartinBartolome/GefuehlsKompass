import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeelingsService } from './services/feelings';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Gefühls-Kompass');
  
  private feelingsService = inject(FeelingsService);
  
  protected readonly currentStep = this.feelingsService.currentStep;
}
