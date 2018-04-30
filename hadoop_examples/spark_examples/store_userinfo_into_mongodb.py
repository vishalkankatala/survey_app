from spark.sql import SparkSession
from spark.sql import Row
from spark.sql import functions

def parse_input_line_for_rows(line):
	fields=line.split("|")
	return Row(user_id=fields[0], age=fields[1], gender=fields[2], occupation=fields[3], zip=fields[4])

if __name__ == "__main__":
	spark_session = SparkSession.builder.appName("MongoDB loader").getOrCreate()
 	
	sc = spark_session.sparkContext
	
	lines = sc.textFile("hdfs://movie_data/u.user")
	
	row_objects = lines.map(parse_input_line_for_rows)
	
	user_dataset = spark_session.createDataFrame(row_objects)
	
	user_dataset.write.format("com.mongodb.spark.sql.DefaultSource")\
	.option("uri","mongodb://127.0.0.1/movieLens.users")\
	.mode("append")\
	.save()
	
	readUsers = spark_session.read.format("com.mongodb.spark.sql.DefaultSource")\
	.option("uri","mongodb://127.0.0.1/movieLens.users")\
	.load()
	
	user_dff=readUsers.createOrReplaceView("users")
	
	user_results = user_dff.sql("select * from users where age < 20")
	
	user_results.show()
	
	spark_session.stop()
	




