from pyspark import SparkSession, SparkContext
from pyspark.sql import Row

MOVIE_INDEX={}

def loadMovieNamesFromIndexFile(movie_index_file):
    with open(movie_index_file) as index_file_object:
        for line in index_file_object:
            split_fields = line.split("|")
            MOVIE_INDEX[int(split_fields[0])]=split_fields[1]

def parse_ratings_line(line):
    _,movie_id,rating,_=line.split("\t")
    return Row(movie_id=int(movie_id),rating=(int(rating))

if __name__ == "__main__":
	spark_session				=	SparkSession().appBuilder("Popular lowest rated movies")
	sc					=	spark_session.sparkContext
	lines					=	sc.textFile("hdfs:///movie_data/u.data")
	row_objects				=	lines.map(parse_ratings_line)
	rating_dataframe			=	spark_session.createDataFrame(row_objects)
	average_movie_rating			=	rating_dataframe.groupBy("movie_id").avg("rating")
	count_ratings_for_movie			=	rating_dataframe.groupBy("movie_id").count()
	avg_and_count_ratings			=	average_movie_rating.join(count_ratings_for_movie,"movie_id")
	filtered_movies_by_count_and_rating	=	avg_and_count_ratings.filter(avg_and_count_ratings("count") > 100 and avg_and_count_ratings("avg(rating)") < 2.0 )
	
	for movie_record in filtered_movies_by_count_and_rating.collect():
		print(MOVIE_INDEX[movie_record[0]],movie_record[1],movie_record[2])
				
