import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadastroPetsComponent } from './pages/cadastropets/cadastropets.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'perfil', component: CadastroPetsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', redirectTo: '/dashboard' }

];

