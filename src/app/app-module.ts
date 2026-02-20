import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './core/components/navbar/navbar';
import { Footer } from './core/components/footer/footer';
import { Home } from './core/components/home/home';
import { RouterModule } from '@angular/router';
import { Login } from './core/components/login/login';
import { AboutUs } from './core/components/about-us/about-us';
import { ContactUs } from './core/components/contact-us/contact-us';
import { Dashboard } from './dashboard/dashboard';
import { ApplyCertificate } from './dashboard/apply-certificate/apply-certificate';
import { MyDocument } from './dashboard/my-document/my-document';
import { Complaints } from './dashboard/complaints/complaints';
import { Announcements } from './dashboard/announcements/announcements';
import { Voting } from './dashboard/voting/voting';


@NgModule({
  declarations: [
    App,
    Navbar,
    Footer,
    Home,
    Login,
    AboutUs,
    ContactUs,
    Dashboard,
    ApplyCertificate,
    MyDocument,
    Complaints,
    Announcements,
    Voting,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
   

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
