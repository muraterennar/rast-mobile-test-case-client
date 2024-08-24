import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { socialResolver } from '../../resolvers/social.resolver';

export const HOME_ROUTES: Routes = [
  { path: '', component: HomePageComponent },
  { path: ':id', component: HomePageComponent, resolve: { socialData: socialResolver } },
];
