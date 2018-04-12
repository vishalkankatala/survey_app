import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './home.component';

export const APP_ROUTES:Routes = [
	{ path:'', component: HomeComponent },
        { path:'recipes', loadChildren:'app/recipes/recipes.module#RecipesModule'},
        { path:'shoppinglist',component:ShoppingListComponent }
]

