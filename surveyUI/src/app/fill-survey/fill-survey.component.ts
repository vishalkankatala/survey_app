import { Component, OnInit } from '@angular/core';
import { Survey } from '../survey';
import { Field } from '../field';
import { ActivatedRoute } from '@angular/router';
import { SurveysService } from '../surveys.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-fill-survey',
  templateUrl: './fill-survey.component.html',
  styleUrls: ['./fill-survey.component.css']
})
export class FillSurveyComponent implements OnInit {
 surveyId:number;
 currentSurvey: Survey;
 myForm: FormGroup;
 surveyLoaded:boolean=false;
 surveyResponseSubmitted:boolean=false;
 
 sampleSurveys:Survey[] = [
		new Survey(
			"name-1",
			[
				new Field("name","string",[],true),
				new Field("age","number",[],true),
				new Field("multipleField","multiple",["admin", "user","senior user"],false),
				new Field("radioField","radio",["male","female"],true)
			]	
		),
		 new Survey(
                        "name-2",
                        [
                                new Field("stringField","string",[],true),
                                new Field("numField","number",[],true),
                                new Field("multipleField","multiple",[],false),
                                new Field("radioField","radio",[],true)
                        ]
                )

	];


  constructor(private surveysService: SurveysService, private activeRoute: ActivatedRoute) { 
	
  }

  ngOnInit() {
	this.activeRoute.params.subscribe(
		(params) => {
			this.surveyId=params["id"];
			this.currentSurvey=this.sampleSurveys[this.surveyId];
                        this.surveysService.getSpecificSurvey(this.surveyId).subscribe(
                                        (data) => {
                                                this.currentSurvey=data;
                                                this.surveyLoaded=true;
                                                this.myForm = new FormGroup({});
                                                for(let field of this.currentSurvey["fields"]){
                        							this.myForm.addControl(field.name,new FormControl(""));
                        							if(field.required){
														this.myForm.controls[field.name].setValidators([Validators.required]);
                        							}
                        						}
                                        }
                                );
		}	
	)
		
  }
	
	onSubmit(){
		console.log(this.myForm.value);
		this.surveysService.submitSurveyResponse(this.surveyId, this.myForm.value).subscribe(
			value => {
				this.surveyResponseSubmitted=true;
				console.log(value);
			}, 
			(err: any) => { console.log(err.status); console.log(err);}

    );
	}

}
