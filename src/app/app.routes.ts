import { Routes } from '@angular/router';
import { HomeComponent } from './pages/pages/home/home.component';
import { RecetasComponent } from './pages/pages/recetas/recetas.component';
import { NuestrasTartasComponent } from './pages/pages/nuestras-tartas/nuestras-tartas.component';
import { NosotrosComponent } from './pages/pages/nosotros/nosotros.component';
import { ContactoComponent } from './miamicakes/components/contacto/contacto.component';
import { FacturaComponent } from './miamicakes/components/factura/factura.component';  // Importamos el nuevo componente


export const routes: Routes = [
  { path: '', component: HomeComponent },  // Página principal
  { path: 'recetas', component: RecetasComponent },
  { path: 'nuestras-tartas', component: NuestrasTartasComponent },  // Página de recetas
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'factura', component: FacturaComponent },
  { path: '', redirectTo: '/contacto', pathMatch: 'full' }
  
];




