import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe'
			
@Component({
  selector: 'rb-recipe-item',
  templateUrl: './recipe-item.component.html',
})

export class RecipeItemComponent implements OnInit {
	@Input() recipeIndex:number;
	@Input() recipe:Recipe;
	
	ngOnInit(){
		console.log("Recipe item created with: "+this.recipeIndex);
	}	
}
