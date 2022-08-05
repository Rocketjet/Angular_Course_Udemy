import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../components/recipes/recipes.model';
import { RecipeBookService } from '../services/recipe-book.service';

@Injectable({ //дає можливість цьому сервісу бути використаним в іншому сервісі
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeBookService) { }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://course-project-e0683-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(res => {
        console.log(res);
      });
  }

  loadRecipes() {
    return this.http.get<Recipe[]>('https://course-project-e0683-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}
