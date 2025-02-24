import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoSliderComponent } from './components/photo-slider/photo-slider.component';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';






@NgModule({
  declarations: [
    PhotoSliderComponent
  ],
  imports: [
    CommonModule,
    
  ],
  exports: [
    PhotoSliderComponent // Exporta el componente
  ],
  providers: [
    provideHttpClient() // Se registra HttpClient de forma explícita
  ],
  
})
export class MiamicakesModule { }