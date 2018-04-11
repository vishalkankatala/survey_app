import json
import requests

def lambda_handler(event, context):
    print json.dumps(event)
    event_data=json.loads(event["Records"][0]["Sns"]["Message"])
    print "Incoming event is: "+json.dumps(event_data)
    result= {
        "Status": "SUCCESS",
        "StackId": event_data["StackId"],
        "RequestId": event_data["RequestId"],
        "PhysicalResourceId":event_data["LogicalResourceId"],
        "LogicalResourceId":event_data["LogicalResourceId"],
        "Data": {
            "PrivateSubnet": "10.0.0.0/25",
            "PublicSubnet": "10.0.0.0/23"
            }
        }
    print "Returning response: "+json.dumps(result)
    response_url=event_data["ResponseURL"]
    response=requests.put(response_url, data=json.dumps(result))
    print "returning response: "+response.content
    return result
