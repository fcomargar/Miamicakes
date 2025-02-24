import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { MealService } from '../../../service/meal.service';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  // Variable para almacenar la palabra clave de búsqueda
  keyword: string = 'cheesecake';
  // Variable para almacenar los resultados de la API
  videos: any;

  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.search();
  }

  // Función que realiza la búsqueda con la palabra actual
  search(): void {
    if (this.keyword && this.keyword.trim() !== '') {
      this.mealService.searchMeal(this.keyword.trim()).subscribe(data => {
        this.videos = data;
        console.log(`Resultados para "${this.keyword}":`, data);
      });
    }
  }
}
