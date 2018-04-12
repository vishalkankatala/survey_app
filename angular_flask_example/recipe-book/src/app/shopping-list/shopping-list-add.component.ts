import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ingredient } from "../ingredient"
import { ShoppingListService } from './shopping-list.service'

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements OnInit, OnChanges {
 
	@Input() selectedItem:Ingredient;	
	addMode:boolean=true;
		 
  	constructor(private sls: ShoppingListService) { }
	
  	ngOnChanges(changes){
		console.log(changes["selectedItem"]);
		if(typeof changes["selectedItem"].currentValue === 'undefined'){
			this.addMode=true;
		}else{
			this.addMode=false;
		}
	}
	
	ngOnInit() {
		this.selectedItem=new Ingredient(null,null);
	}
	
	onSubmit(ingredient){
		if(this.addMode){
			this.sls.addIngredients([ingredient]);		
		}else{
			const newIngredient=new Ingredient(ingredient.name,ingredient.quantity)			
			console.log(newIngredient);
			if(newIngredient.name === ''){
				newIngredient.name=this.selectedItem.name;
			}
			if(ingredient.quantity === ''){
                                newIngredient.quantity=this.selectedItem.quantity;
                        }
			this.sls.updateIngredient(this.selectedItem, newIngredient);
		}
	}
	
	onDelete(){
		this.sls.removeIngredient(this.selectedItem);
	        this.selectedItem=new Ingredient(null,null);	
		this.addMode=true;
	}
}

