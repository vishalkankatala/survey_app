import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Survey } from './survey';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SurveysService {

  constructor(private http:Http) { 
}	
	getAllSurveys(){
		return this.http.get("http://localhost:5000/surveys").map((res) => res.json());	
	}
	
	addNewSurvey(survey: Survey){
		return this.http.post(
			"http://localhost:5000/surveys",
			JSON.stringify(survey));
	}
	
	getSpecificSurvey(surveyId:number){
		return this.http.get("http://localhost:5000/surveys/"+surveyId).map((res) => res.json());
	}

	submitSurveyResponse(surveyId:number ,surveyResponse){
		return this.http.post(
			"http://localhost:5000/surveys/"+surveyId+"/responses",
			JSON.stringify(surveyResponse));
	}


}
