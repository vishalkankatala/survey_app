import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {Recipe} from "../recipe"
import {RecipesService} from "../recipes.service"

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
})


export class RecipeListComponent implements OnInit {
  	@Output() recipeEventEmitter = new EventEmitter<Recipe>();
  	recipes:Recipe[]
	
	constructor(private recipeService:RecipesService){
		this.recipeService.storeRecipes();		
		this.recipeService.retrieveRecipes();
	}
	
	onSelect(selectedRecipe:Recipe){
		this.recipeEventEmitter.emit(selectedRecipe);
	}	

	ngOnInit(){
		this.recipes=this.recipeService.getRecipes();	
	}
}
