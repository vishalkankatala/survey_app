import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SurveySignupComponent } from './survey-signup/survey-signup.component';
import { FillSurveyComponent } from './fill-survey/fill-survey.component';
import { SurveysService } from './surveys.service'
import { ReactiveFormsModule } from '@angular/forms';
import { surveyRoutes } from './app.routes';
import {Routes,RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    SurveySignupComponent,
    FillSurveyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(surveyRoutes)
  ],
  providers: [SurveysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
