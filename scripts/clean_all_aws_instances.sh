#! /bin/bash

for output in `aws ec2 describe-instances|jq '.Reservations[].Instances[].InstanceId'`
	do	
		echo $output
 	done
