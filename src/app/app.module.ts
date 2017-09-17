import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routing
import {APP_ROUTING} from './app.routes';

//Services
import {TruffleEthereumService} from './services/truffle-ethereum.service'

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { ContentDetailComponent } from './components/content-detail/content-detail.component';
import { RightbarComponent } from './components/rightbar/rightbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    ContentDetailComponent,
    RightbarComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [TruffleEthereumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
