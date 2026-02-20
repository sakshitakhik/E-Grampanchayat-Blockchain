import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { Footer } from './core/components/footer/footer';
import { Home } from './core/components/home/home';
import { Login } from './core/components/login/login';
import { AboutUs } from './core/components/about-us/about-us';
import { ContactUs } from './core/components/contact-us/contact-us';
import { Dashboard } from './dashboard/dashboard';

import { FormsModule } from '@angular/forms';
import { ApplyCertificate } from './dashboard/apply-certificate/apply-certificate';
import { Complaints } from './dashboard/complaints/complaints';
import { Announcements } from './dashboard/announcements/announcements';
import { MyDocument } from './dashboard/my-document/my-document';
import { Voting } from './dashboard/voting/voting';

const routes: Routes = [
  {path:'',component:Home},
  
  {path:'login',component:Login},
  {path:'about-us',component:AboutUs},
  {path:'contact-us',component:ContactUs},
  {path:'dashboard',component:Dashboard,
    children:[
      {path:'', redirectTo: 'apply-certificate', pathMatch: 'full' },
      { path: 'apply-certificate', component: ApplyCertificate},
      { path: 'complaints', component: Complaints },
      { path: 'announcements', component: Announcements },
      { path: 'my-documents', component: MyDocument },
      {path:'voting',component:Voting}
    ]}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
