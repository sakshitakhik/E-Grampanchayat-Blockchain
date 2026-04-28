import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ApplyCertificate } from './components/apply-certificate/apply-certificate';
import { TrackApplication } from './components/track-application/track-application';
import { SubmitComplaint } from './components/submit-complaint/submit-complaint';
import { Votes } from './components/votes/votes';
import { Announcements } from './components/announcements/announcements';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { GramsevakDashboard } from './components/gramsevak/gramsevak-dashboard/gramsevak-dashboard';
import { BlockchainExplorer } from './components/blockchain-explorer/blockchain-explorer';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'apply-certificate', component: ApplyCertificate },
    { path: 'track-application', component: TrackApplication },
    { path: 'submit-complaint', component: SubmitComplaint },
    { path: 'votes', component: Votes },
    { path: 'announcements', component: Announcements },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'gramsevak-dashboard', component: GramsevakDashboard },
    { path: 'blockchain', component: BlockchainExplorer },
    { path: '**', redirectTo: '' }
];
