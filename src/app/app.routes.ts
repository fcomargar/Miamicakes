import { Routes } from '@angular/router';
import { HomeComponent } from './pages/pages/home/home.component';
import { RecetasComponent } from './pages/pages/recetas/recetas.component';
import { NuestrasTartasComponent } from './pages/pages/nuestras-tartas/nuestras-tartas.component';
import { NosotrosComponent } from './pages/pages/nosotros/nosotros.component';
import { ContactanosComponent } from './pages/pages/contactanos/contactanos.component';
import { ResguardoComponent } from './pages/pages/resguardo/resguardo.component';
import { LoginPageComponent } from './pages/pages/login-page/login-page.component';
import { RegistroPageComponent } from './pages/pages/registro-page/registro-page.component';
import { DashboardUserComponent } from './pages/pages/dashboard-user/dashboard-user.component';
import { AdminComponent } from './pages/pages/admin/admin.component';  


export const routes: Routes = [
  { path: '', component: HomeComponent },  // Página principal
  { path: 'recetas', component: RecetasComponent },
  { path: 'nuestras-tartas', component: NuestrasTartasComponent },  // Página de recetas
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactanosComponent },
  { path: 'factura', component: ResguardoComponent },
  { path: 'recetas', component: RecetasComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registro', component: RegistroPageComponent },
  { path: 'dashboard', component: DashboardUserComponent},
  { path: 'dashboard-admin', component: AdminComponent},
  { path: '', redirectTo: '/contacto', pathMatch: 'full' }
  
];




