import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadastroPetsComponent } from './pages/cadastropets/cadastropets.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SobreComponent } from './pages/sobre/sobre.component';

export const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'perfil', component: CadastroPetsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '**', redirectTo: '/cadastro' }
];

