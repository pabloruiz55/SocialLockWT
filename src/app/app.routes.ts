import { RouterModule, Routes } from '@angular/router';
import {ContentComponent} from './components/content/content.component';
import {MainComponent} from './components/main/main.component';
import {ContentDetailComponent} from './components/content-detail/content-detail.component';
import {ContributeComponent} from './components/contribute/contribute.component';


const APP_ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'content/:id', component: ContentDetailComponent },
  { path: 'categories/:category', component: MainComponent },
  { path: 'new', component: ContributeComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});
