import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadastroPetsComponent } from './pages/cadastropets/cadastropets.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: CadastroPetsComponent },
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: '**', redirectTo: '/cadastro' }
];

