ratings = LOAD '/movie_data/u.user' using PigStorage('|') AS (userId: int, age: int, gender: chararray, occupation: chararray, zip: int);

store ratings into 'hbase://users' using org.apache.pig.backend.hadoop.hbase.HBaseStorage('userinfo:userId,userinfo:age,userinfo:gender,userinfo:occupation,userinfo:zip');

