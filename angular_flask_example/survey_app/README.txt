Front End: Angular 2.0
Backend: Python Flask
Database: Mongolabs

Please run the deploy script to have the 2 services up and running locally. The script needs python, angular alrready installed.

goto localhost:4200/surveys/new --> Add a new json based survey
goto localhost:4200/surveys/:survey_id To submit a responde to a created survey.

Please note the below
1. I have strictly stuck to the 3 hour window.. so there are no validations to any of the code at all.
2. You will find several hard coded configurations in the code for now unfortunately. 


Feature additions I did not have time to get to: 
1. Ability to turn on/off a survey in the database.
2. More custom fields in the survey response.
3. Custom graphs attached to each survey to track data easily.
4. More UI work to make it look way more fancier!
5. List page to show a list of all active surveys running.
