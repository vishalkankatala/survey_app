from pyspark.sql import SparkSession
from pyspark.sql import Row
from pyspark.sql import functions

def parseInputFileForRowObjects(line):
	fields = line.split("|")
	return Row(user_id=int(fields[0]), gender=fields[1],occupation=fields[2], zip=int(fields[3]))

if __name__ == "__main__":
	spark_session = SparkSession.builder.appName("Cassandra Loader").config("spark.cassandra.connection.host","127.0.0.1").getOrCreate()
	
	sc = spark_session.sparkContext
	
	lines = sc.textFile("hdfs://movie_data/u.user")

	row_objects = lines.map(parseInputFileForRowObjects)
	
	user_info_dataset = spark_session.createDataFrame(row_objects)
	
	user_info_dataset.write.format("org.apache.spark.sql.cassandra")\
	.mode("append")\
	.options(table="users", keyspace="movielens")\
	.save()
	
	spark_session.read.format("org.apache.spark.sql.cassandra")\
	.options(table="users", keyspace="movielens")\
	.load()
	
	spark_session.createOrReplaceTempView("users")
	
	sqlDF = spark_session.sql("select * from users where age<30")
	
	sqlDF.show()
	
	spark_session.stop()			
	
