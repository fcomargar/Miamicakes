import { Routes } from '@angular/router';
import { HomeComponent } from './pages/pages/home/home.component';
import { RecetasComponent } from './pages/pages/recetas/recetas.component';
import { NuestrasTartasComponent } from './pages/pages/nuestras-tartas/nuestras-tartas.component';
import { NosotrosComponent } from './pages/pages/nosotros/nosotros.component';
import { ContactanosComponent } from './pages/pages/contactanos/contactanos.component';
import { ResguardoComponent } from './pages/pages/resguardo/resguardo.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },  // Página principal
  { path: 'recetas', component: RecetasComponent },
  { path: 'nuestras-tartas', component: NuestrasTartasComponent },  // Página de recetas
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactanosComponent },
  { path: 'factura', component: ResguardoComponent },
  { path: 'recetas', component: RecetasComponent },
  { path: '', redirectTo: '/contacto', pathMatch: 'full' }
  
];




