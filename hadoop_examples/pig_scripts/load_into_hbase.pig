ratings = LOAD '/movie_data/u.user' using PigStorage("\t") AS (userId: int, age: int, gender: chararray, occupation: chararray, zip: int);

store ratings into "hbase://users" using org.apache.pig.backend.hadoop.hbase.HBaseStorage('userInfo:userId,userInfo:age,userInfo:gender,userInfo:occupation,userInfo:zip');


