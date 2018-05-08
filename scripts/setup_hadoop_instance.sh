#!/bin/bash


image_id=`aws ec2 describe-images --filters "Name=name,Values=hortonworks-sandbox-05-07-2018"|python -c 'import sys, json; print json.load(sys.stdin)["Images"][0]["ImageId"]'`

aws ec2 run-instances --image-id $image_id --instance-type t2.large --security-group-ids sg-f97e0d92


