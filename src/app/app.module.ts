import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routing
import {APP_ROUTING} from './app.routes';

//Services
import {TruffleEthereumService} from './services/truffle-ethereum.service'
import {FirebaseService} from './services/firebase.service'

//Firebase config
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { ContentDetailComponent } from './components/content-detail/content-detail.component';
import { RightbarComponent } from './components/rightbar/rightbar.component';
import { ContentPipe } from './components/content/content.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    ContentDetailComponent,
    RightbarComponent,
    ContentPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule,
    APP_ROUTING
  ],
  providers: [/*TruffleEthereumService,*/FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
