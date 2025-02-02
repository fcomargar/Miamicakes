import { Component , ChangeDetectorRef } from '@angular/core';

import { 
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';

@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.css'],
  animations: [
    trigger('slideAnimation', [
      state('left', style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      state('right', style({
        transform: 'translateX(0%)',
        opacity: 1
      })),
      transition('* => right', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        }),
        animate('500ms ease-in-out', style({
          transform: 'translateX(0%)',
          opacity: 1
        }))
      ]),
      transition('* => left', [
        style({
          transform: 'translateX(100%)',
          opacity: 0
        }),
        animate('500ms ease-in-out', style({
          transform: 'translateX(0%)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class PhotoSliderComponent {
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
  ];
  
  currentIndex: number = 0;
  direction: 'left' | 'right' = 'right';

  prevImage(): void {
    this.direction = 'left';
    this.currentIndex = this.currentIndex === 0 
      ? this.images.length - 1 
      : this.currentIndex - 1;
    this.cdr.detectChanges();    
  }

  nextImage(): void {
    this.direction = 'right';
    this.currentIndex = this.currentIndex === this.images.length - 1 
      ? 0 
      : this.currentIndex + 1;
      this.cdr.detectChanges();  
  }

  constructor(private cdr: ChangeDetectorRef) {}

  selectImage(index: number): void {
    this.currentIndex = index;
    this.cdr.detectChanges(); // Fuerza la detección de cambios
  }
}