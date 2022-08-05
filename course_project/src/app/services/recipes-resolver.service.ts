import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../components/recipes/recipes.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeBookService } from './recipe-book.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private storageService: DataStorageService,
    private recipeService: RecipeBookService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes()
    if (recipes.length === 0) {
      return this.storageService.loadRecipes();
    } else return recipes;
  }
}
