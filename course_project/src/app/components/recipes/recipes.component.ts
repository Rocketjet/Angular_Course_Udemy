import { Component, OnInit } from '@angular/core';
import { RecipeBookService } from 'src/app/services/recipe-book.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeBookService],
})
export class RecipesComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
