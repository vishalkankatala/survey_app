from pyspark import SparkConf, SparkSession
from pyspark.sql import Row

MOVIE_INDEX={}

def loadMovieNamesFromIndexFile(movie_index_file):
    with open(movie_index_file) as index_file_object:
        for line in index_file_object:
            split_fields = line.split("|")
            MOVIE_INDEX[int(split_fields[0])]=split_fields[1]

def build_row_tuple_for_rating_data(line):
	_,movie_id,rating,_	=	line.split("\t")
	return (Row(movie_id=movie_id, rating=rating))

if __name__ == "__main__":
	spark_session = SparkSession().appBuilder("Lowest Rated Movies")
	
	sc = spark_session.sparkContext

	lines	=	sc.textFile("hdfs:///movie_data/u.data")
	
	row_objects	=	lines.map(build_row_tuple_for_rating_data)
	
	rating_dataframes	=	spark_session.createDataFrame(row_objects)

	avg_movie_rating_dff	=	rating_dataframes.groupBy("movie_id").avg("rating")

	count_ratings		=	rating_dataframes.groupBy("movie_id").count()

	averages_and_counts	=	count_ratings.join(avg_movie_rating_dff,"movie_id")

	ordered_results		=	averages_and_counts.orderBy("avg(rating)").take(10)
	
	loadMovieNamesFromIndexFile("u.item")	

	for movie in ordered_results:
		print (MOVIE_INDEX[movie[0]],movie[1],movie[2])

	sc.stop()		
