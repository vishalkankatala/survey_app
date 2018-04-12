from pymongo import MongoClient

class MongoStorage:

    def __init__(self):
        self.client=MongoClient("mongodb://surveyuser:surveypassword@ds139360.mlab.com:39360/surveydatabase");
        self.db_=self.client.surveydatabase

    def getNextSequence(self):
        ret = self.db_.counters.find_one_and_update(
            {"_id": "surveyid"},
            {"$inc": {"seq": 1}})
        return ret["seq"]

    def addSurvey(self, surveyJson):
        surveyJson["surveyId"]=self.getNextSequence()
        self.db_.surveys.insert_one(surveyJson);
        del surveyJson["_id"]

    def addSurveyResponse(self, surveyId, surveyResponseJson):
        self.db_[str(surveyId)].insert_one(dict(surveyResponseJson));

    def getSurvey(self, survey_id):
        return self.db_.surveys.find_one({"surveyId":survey_id},{'_id': False})

    def getAllSurveys(self):
         result=[]
         for survey in self.db_.surveys.find({},{'_id': False}):
             result.append(survey)
         return result


"""

print MongoStorage().getAllSurveys()

print MongoStorage().getSurvey(4)


MongoStorage().addSurvey(
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

);

"""