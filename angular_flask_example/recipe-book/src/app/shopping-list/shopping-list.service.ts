import { Injectable } from '@angular/core';
import {Ingredient} from '../ingredient';

@Injectable()
export class ShoppingListService {
  items:Ingredient[] = [
		new Ingredient("ing-1",10),
		new Ingredient("ing-2",20)
	];

  	constructor() {}
	
  	getIngredients(){
		return this.items;		
	}

  	addIngredients(incomingItems: Ingredient[]){
		Array.prototype.push.apply(this.items, incomingItems);			
	}
	
	removeIngredient(ingredient:Ingredient){
		const curIndex=this.items.indexOf(ingredient);
		this.items.splice(curIndex,1);
	}
	
	updateIngredient(oldIngredient: Ingredient, newIngredient:Ingredient){
		console.log("Edit requested on "+oldIngredient.name+" to "+newIngredient.name);
                console.log("Edit requested on "+oldIngredient.quantity+" to "+newIngredient.quantity);
		const curIndex=this.items.indexOf(oldIngredient);
		this.items[curIndex]=newIngredient;
	}
}
