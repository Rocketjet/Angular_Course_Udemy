import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../components/recipes/recipes.model';
import { RecipeBookService } from '../services/recipe-book.service';

@Injectable({ //дає можливість цьому сервісу бути використаним в іншому сервісі
  providedIn: 'root'
})
export class DataStorageService {//Сервіс, який відповідає за збереження рецептів на бекенді і їх отримання звідти по запиту
  constructor(
    private http: HttpClient,
    private recipeService: RecipeBookService,
    private authService: AuthService
  ) { }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://course-project-e0683-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(res => {
        console.log(res);
      }); //Зберігаємо рецепти на бекенді
  }

  loadRecipes() {
    return this.authService.user$
      .pipe(
        take(1),
        exhaustMap(user => {
          return this.http.get<Recipe[]>('https://course-project-e0683-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            {
              params: new HttpParams().set('auth', user.token)
            });
        }),
        map(recipes => {
          return recipes.map(recipe => {
            return { //для того, щоб зберегти правильну структуру об'єкта рецепту, так як ми можемо створити рецепт без інгредієнтів, і тоді така властивість додана в об'єкт не буде, робимо перевірку на наявність такої властивості. Якщо її немає, додаємо і ставимо як значення []
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }));
  }//Отримуємо рецепти з бекенду і передаєм в сервіс, де вони зберігаються і розподіляються
}
