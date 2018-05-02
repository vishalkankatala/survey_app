REGISTER '/usr/hdp/current/phoenix-client/phoenix-client.jar'

users = LOAD '/movie_data/u.user' using PigStorage("|") AS (userId: int, age: int, gender: chararray, occupation: chararray, zip: chararray);

STORE users INTO 'hbase://users' using org.apache.phoenix.pig.PhoenixHbaseStorage('localhost','-batchSize 5000');

occupations = load 'hbase://table/users/USERID,OCCUPATION' using org.apache.phoenix.pig.PhoenixHbaseStorage('localhost');

grouped_occupations = GROUP occupations BY OCCUPATION;

cnt = FOREACH grouped_occupations GENERATE group as occupation, COUNT(occupations);

dump cnt;


