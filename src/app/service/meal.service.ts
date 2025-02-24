import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  // URL base de la API de TheMealDB
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  /**
   * Realiza una búsqueda en la API usando el término indicado.
   * @param term - El término de búsqueda (ej. "cheesecake", "cupcake", etc.)
   * @returns Observable con la respuesta de la API
   */
 
  searchMeal(term: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}search.php?s=${term}`);
  }
}
