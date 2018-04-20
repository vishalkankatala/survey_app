from pyspark.sql import SparkSession
from pyspark.sql import Row
from pyspark.ml.recommendation import ALS
from pyspark.sql.functions import lit

MOVIE_INDEX = {}


def parse_ratings_line(line):
    user_id, movie_id, rating, _ = line.split("\t")
    return Row(
        user_id=int(user_id),
        movie_id=int(movie_id),
        rating=int(rating)
    )


def loadMovieNamesFromIndexFile(movie_index_file):
    with open(movie_index_file) as index_file_object:
        for line in index_file_object:
            split_fields = line.split("|")
            MOVIE_INDEX[int(split_fields[0])] = split_fields[1]


if __name__ == "__main__":
    spark_session = SparkSession.builder.appName("Recommend Movies").getOrCreate()

    spark_context = spark_session.sparkContext

    lines = spark_context.textFile("hdfs:///movie_data/u.data")

    row_objects = lines.map(parse_ratings_line)

    rating_dff = spark_session.createDataFrame(row_objects).cache()

    # create an ALS model

    als = ALS(maxIter=5, regParam=0.01, userCol="user_id", itemCol="movie_id", ratingCol="rating")

    model = als.fit(rating_dff)

    # Print out the ratings for the user-id 0 movies
    user_id_0_movies = rating_dff.filter("user_id = 0").collect()

    for user_movie_rating in user_id_0_movies:
        print user_movie_rating

    # Find all the highest rated movies
    high_rated_movies = rating_dff.groupBy("movie_id").count().filter("count > 100")

    # Prepare the test data set
    test_dataset = high_rated_movies.select("movie_id").withColumn("user_id", lit(0))

    predictions = model.transform(test_dataset)

    # Print the predictions to see how they look
    print "This is how predictions look like: "
    for prediction in predictions.take(10):
        print prediction

    spark_session.stop()
