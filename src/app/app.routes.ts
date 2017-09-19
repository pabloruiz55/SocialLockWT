import { RouterModule, Routes } from '@angular/router';
import {ContentComponent} from './components/content/content.component';
import {ContentDetailComponent} from './components/content-detail/content-detail.component';

const APP_ROUTES: Routes = [
  { path: '', component: ContentComponent },
  { path: 'content/:id', component: ContentDetailComponent },
  { path: 'categories/:category', component: ContentComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});
