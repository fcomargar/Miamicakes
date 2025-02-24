import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/**
 * @component
 * @description Componente para mostrar una galería de imágenes con un efecto de polaroid. 
 * Permite seleccionar una imagen para verla en un modal ampliado.
 */
@Component({  
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.css']
})
export class PhotoSliderComponent {
  /**
   * @property {string[]} images - Lista de rutas de las imágenes de la galería.
   */
  images: string[] = [
    'assets/gato.jpg',
    'assets/boda.png',
    'assets/barril.jpg',
    'assets/babyshower.jpg',
    'assets/bratz.png',
    'assets/cruz.jpg',
    'assets/cruz2.png',
    'assets/cumpleaños.png',
    'assets/Disney2.jpg',
    'assets/disneyhw.jpg',
    'assets/globo.png',
    'assets/hulck .jpg',
    'assets/selva.jpg',
    'assets/selva1.jpg',
    'assets/vaca.jpg',
    'assets/mcdonals.jpg',
    'assets/paella.jpg',
    'assets/perro.jpg',
    'assets/arcoiris.jpg',  
  ];

  /**
   * @property {string | null} selectedImage - Almacena la imagen seleccionada para mostrarla en el modal.
   */
  selectedImage: string | null = null;

  constructor(private router: Router) {} // Inyecta Router en el constructor

  /**
   * @method openImage
   * @description Abre el modal con la imagen seleccionada.
   * @param {string} image - Ruta de la imagen seleccionada.
   */
  openImage(image: string): void {
    this.selectedImage = image;
  }

  /**
   * @method closeImage
   * @description Cierra el modal y restablece la imagen seleccionada.
   */
  closeImage(): void {
    this.selectedImage = null;
  }

   /**
   * Método para navegar a otra ruta.
   * @param path Ruta a la que se desea navegar.
   */
   navigateTo(path: string): void {
    this.router.navigate([path]); // Navega a la ruta especificada
  }

}
