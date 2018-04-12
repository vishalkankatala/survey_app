import {Routes} from '@angular/router';
import { FillSurveyComponent } from './fill-survey/fill-survey.component';
import { SurveySignupComponent } from './survey-signup/survey-signup.component';
import { AppComponent } from './app.component';
export const surveyRoutes:Routes = [
        {path:"surveys/new",component:SurveySignupComponent},
	{path:"surveys/:id",component:FillSurveyComponent}
];



