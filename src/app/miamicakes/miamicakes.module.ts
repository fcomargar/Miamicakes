import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoSliderComponent } from './components/photo-slider/photo-slider.component';



@NgModule({
  declarations: [
    PhotoSliderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PhotoSliderComponent // Exporta el componente
  ]
})
export class MiamicakesModule { }