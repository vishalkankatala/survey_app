import { Component, OnInit } from '@angular/core';
import { SurveysService } from '../surveys.service'; 
import { Survey } from '../survey';
import { FormGroup, FormControl,Validators } from "@angular/forms";

@Component({
  selector: 'app-survey-signup',
  templateUrl: './survey-signup.component.html',
  styleUrls: ['./survey-signup.component.css']
})
export class SurveySignupComponent implements OnInit {
  
	surveys:Survey[];
	formGroup: FormGroup;
	createSucceeded: boolean=false;	
	exampleUrl:string="assets/example-js.png";
	
  constructor(private surveyService: SurveysService) { 

	}

  	ngOnInit() {
  		this.formGroup = new FormGroup({
			"newSurvey": new FormControl("<<Please paste in your survey over here>>",Validators.required)
		});	
	}
	
	onSubmit(){
		this.createSucceeded=false;
		try{
			let newSurvey:Survey = JSON.parse(this.formGroup.value["newSurvey"]);
			this.surveyService.addNewSurvey(newSurvey).subscribe(
				(res) => {	
						if(res.status == 200){
							this.createSucceeded=true;
						}
					}
			);
				
		}catch(e){
			console.log(e);
		}
	}

}
