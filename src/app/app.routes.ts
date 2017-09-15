import { RouterModule, Routes } from '@angular/router';
import {ContentComponent} from './components/content/content.component';
import {ContentDetailComponent} from './components/content-detail/content-detail.component';

const APP_ROUTES: Routes = [
  { path: '', component: ContentComponent },
  { path: ':id', component: ContentDetailComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});
