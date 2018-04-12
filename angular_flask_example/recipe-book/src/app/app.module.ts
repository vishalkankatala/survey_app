import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesService } from './recipes/recipes.service'
import { ShoppingListService } from './shopping-list/shopping-list.service'

import { DropdownDirective } from './dropdown.directive';
import { APP_ROUTES } from './app.routes'
import { RouterModule } from '@angular/router';

import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    HomeComponent
  ],
  imports: [
    ShoppingListModule,
    BrowserModule,
    HttpModule,  
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [RecipesService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
