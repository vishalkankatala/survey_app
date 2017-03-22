#! /bin/bash

virtualenv .surveyApp

source .surveyApp/bin/activate

pip install -r requirements.txt

python source_code/surveyApp.py &> flask_log.log&

cd surveyUI/src/app/

ng serve &> angular_log.log&
