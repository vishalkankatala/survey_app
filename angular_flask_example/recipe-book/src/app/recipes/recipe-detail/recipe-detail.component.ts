import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from "../recipe";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { RecipesService } from "../recipes.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
	selectedRecipe:Recipe;	
	recipeIndex:number;	

	constructor(private router: Router, private recipesService: RecipesService, private shoppingListService: ShoppingListService,private activatedRoute:ActivatedRoute) { 	
		
	}
	
	ngOnInit() {
		this.activatedRoute.params.subscribe(
			(params:any) => {
				this.recipeIndex=params["id"];
				this.selectedRecipe=this.recipesService.getRecipe(params["id"]);			
			} 
		);
  	}
	
	addToShoppingCart(){
		this.shoppingListService.addIngredients(this.selectedRecipe.ingredients);	
	}
	
	onEdit(){
		this.router.navigate(["/recipes",this.recipeIndex,"edit"]);		
	}
	
	onDelete(){
		this.recipesService.removeRecipe(this.recipeIndex);	
	}
}
