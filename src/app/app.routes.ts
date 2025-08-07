import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { GefuehleErkennen } from './components/gefuehle-erkennen/gefuehle-erkennen';
import { GefuehleAnnehmen } from './components/gefuehle-annehmen/gefuehle-annehmen';
import { GefuehleBewaeltigen } from './components/gefuehle-bewaeltigen/gefuehle-bewaeltigen';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'gefuehle-erkennen', component: GefuehleErkennen },
  { path: 'gefuehle-annehmen', component: GefuehleAnnehmen },
  { path: 'gefuehle-bewaeltigen', component: GefuehleBewaeltigen },
  { path: '**', redirectTo: '' }
];
