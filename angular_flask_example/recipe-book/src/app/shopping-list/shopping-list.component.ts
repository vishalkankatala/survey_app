import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {Ingredient} from '../ingredient';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
	
  items:Ingredient[];
  selectedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }
			
  ngOnInit() {
  	this.items=this.shoppingListService.getIngredients();
  }
		
	onSelect(selectedItem:Ingredient){
		this.selectedItem=selectedItem;			
	}
}
