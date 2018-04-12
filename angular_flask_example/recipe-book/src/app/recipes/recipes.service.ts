import { Injectable } from '@angular/core';
import {Recipe} from './recipe'
import {Ingredient} from '../ingredient'
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RecipesService {
  recipes:Recipe[] = [];
	
  	constructor(private http:Http) { }	

  	getRecipes(){
			return this.recipes; 
		}
  	getRecipe(index:number): Recipe{
		return this.recipes[index];
	}
	
	addRecipe(recipe:Recipe){
		this.recipes.push(recipe);
	}
	
	updateRecipe(oldRecipe:Recipe, newRecipe:Recipe){
		let oldRecipeIndex=this.recipes.indexOf(oldRecipe);
		this.recipes[oldRecipeIndex]=newRecipe;
	}
	
	removeRecipe(recipeIndex:number){	
		this.recipes.splice(recipeIndex,1);	
	}
	
	storeRecipes(){
		this.recipes = [ new Recipe(
                                "dummy-3","dummy-3","https://upload.wikimedia.org/wikipedia/commons/3/37/Small-world-network-example.png",
                                [new Ingredient("ing-1",10),new Ingredient("ing-2",25)]
                           		),
                		new Recipe("dummy-2","dummy-2","https://i.ytimg.com/vi/m14qCXlJJwk/maxresdefault.jpg", [new Ingredient("ing-1",10),new Ingredient("ing-2",25)])];

		const body=JSON.stringify(this.recipes);
		const headers = new Headers();
		headers.append("Content-type","application/json");	
		this.http.put("https://recipeservice-8409c.firebaseio.com/recipes.json", body,{"headers":headers}).map(
			(response) => response.json()).subscribe(
				(data) => {
					console.log("Data has been saved succesfully");
					console.log(data);
				},
				(error) => {
					console.log("A small error has happened");
					console.log(error);
				}
			);		
	}
	
	retrieveRecipes(){
		
		this.http.get("https://recipeservice-8409c.firebaseio.com/recipes.json").map((response) => response.json()).subscribe(

			(data) => {
				console.log("Data retrieved successfully");
				this.recipes=data;
			},
			(error) => {
				console.log("Error occured while retrieving the recipe data");
				console.log(error);
			}
		);		
	}
}
