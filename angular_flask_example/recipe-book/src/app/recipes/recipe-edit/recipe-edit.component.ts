import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Recipe } from '../recipe';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: []
})
export class RecipeEditComponent implements OnInit {
	
	selectedRecipe:Recipe;
	curFormGroup: FormGroup;	
	editMode:boolean=false;	

	constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private recipeService: RecipesService) { 
			
	}
	
	initForm(){
		let name="";
		let description="";
		let imageUrl="";
		let ingredients=this.formBuilder.array([]);
		if(this.editMode){
			name=this.selectedRecipe.name;
			description=this.selectedRecipe.description;
			imageUrl=this.selectedRecipe.imageUrl;
			for(let ingredient of this.selectedRecipe.ingredients){
				ingredients.push(this.formBuilder.group({'name':ingredient.name,'quantity':ingredient.quantity}));
			}	
		}
			this.curFormGroup = this.formBuilder.group({
                        	'name': [name,Validators.required],
                        	'description':[description,Validators.required],
                        	'imageUrl':[imageUrl,Validators.required],
                        	'ingredients': ingredients

                	});

		
	}
	
	ngOnInit() {
		this.initForm()
		this.route.params.subscribe(
			(params:any) => {
				if(params.hasOwnProperty("id")){
					this.editMode=true;
					this.selectedRecipe=this.recipeService.getRecipe(params["id"]);								
				}else{
					this.editMode=false;
				}
				this.initForm();
			});
 	 }
			
	addIngredientUI(name:string, quantity:number){
		(<FormArray>this.curFormGroup.controls["ingredients"]).push(this.formBuilder.group({"name":name,"quantity":quantity}));
	}
		
	removeIngredientUI(index:number){
		(<FormArray>this.curFormGroup.controls["ingredients"]).removeAt(index);
	}
	
	addRecipe(){
		if(this.editMode){
			this.recipeService.updateRecipe(this.selectedRecipe,this.curFormGroup.value);
		}else{
			console.log("Being Created");
			this.recipeService.addRecipe(this.curFormGroup.value);
		}
	}
}
