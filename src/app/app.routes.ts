import {Routes} from '@angular/router';
import {HomeComponent} from './features/learning/pages/home/home.component';
import { RatingComponent } from './engagement/pages/rating/rating.component';

const PageNotFoundComponent = () => import('./features/learning/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { 
    path: 'engagement',
    children: [
      {
        path: 'ratings/new',
        component: RatingComponent
      }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: PageNotFoundComponent }
];
