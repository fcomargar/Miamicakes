import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  standalone:true,  
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    // Si la URL es de YouTube en formato "watch?v="
    if (url.includes('youtube.com/watch?v=')) {
      // Extraemos el ID del video
      const videoId = url.split('watch?v=')[1].split('&')[0];
      // Convertimos la URL a formato embed
      url = `https://www.youtube.com/embed/${videoId}`;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
