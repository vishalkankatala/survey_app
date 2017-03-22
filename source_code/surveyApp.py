from flask import Flask, request, make_response
from databaseHandler import MongoStorage

import json

SURVEYS = [
	{
		"name":"survey-1",
		"fields": [
			{
				"name":"name",
				"type":"string",
				"optionalList":[],
				"required":True

			},
			{
				"name":"age",
				"type":"number",
				"optionalList":[],
				"required":True
			},
			{
				"name":"sex",
				"type":"radio",
				"optionalList":["male","female"],
				"required":True
			},
			{
				"name":"certifications",
				"type":"multiple",
				"optionalList":["PMP","CAPM","CCDH"],
				"required":False
			}
			]
	}	
]	

SURVEY_RESPONSES = {}

app=Flask(__name__)

mongo_client=MongoStorage()

@app.route("/")
def index():
	return "Welcome to the survery app"

def addCorsResponse(response):
        response.headers["Access-Control-Allow-Origin"]="*"

@app.route("/surveys/<int:survey_id>",methods=["GET"])
def getSurvey(survey_id):
	survey_obj=mongo_client.getSurvey(survey_id)
	if(not survey_obj):
		response=make_response("Cannot find it")
		response.status_code=400
	else:
		response=make_response(json.dumps(mongo_client.getSurvey(survey_id)))
		response.status_code=200
		addCorsResponse(response)
	return response

@app.route("/surveys",methods=["GET"])
def getSurveys():
	response=make_response(mongo_client.getAllSurveys())
	response.status_code=200
	addCorsResponse(response)
	return response

@app.route("/surveys",methods=["POST"])
def addSurvey():
	new_survey=json.loads(request.data)
	mongo_client.addSurvey(new_survey)
	response=make_response(json.dumps(new_survey))
	response.status_code=200
	addCorsResponse(response)
	return response

@app.route("/surveys/<int:survey_id>/responses",methods=["POST"])
def addSurveyResponse(survey_id):
	survey_response=json.loads(request.data)
	print survey_response
	mongo_client.addSurveyResponse(survey_id,survey_response)
	response = make_response()
	addCorsResponse(response)
	response.status_code=201
	response.ok=True
	return response

if __name__ == "__main__":
	app.run(debug=True)

