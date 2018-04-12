import {  RecipeStartComponent } from "./recipe-start.component";
import {  RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import {  RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesComponent } from './recipes.component';
import { Routes, RouterModule } from "@angular/router";

const RECIPE_ROUTES:Routes=[
		{path: '',  component:RecipesComponent, 
			children:[
                                        {path: '', component:RecipeStartComponent},
					{path: 'new', component:RecipeEditComponent},
					{path: 'edit', component:RecipeEditComponent},
					{path: ':id',	component:RecipeDetailComponent},
					{path: ':id/edit', component:RecipeEditComponent}
				]
		}
	];

export const recipeRouting=RouterModule.forChild(RECIPE_ROUTES);
