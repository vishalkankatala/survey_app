from pyspark import SparkConf, SparkContext

MOVIE_INDEX={}

def loadMovieNamesFromIndexFile(movie_index_file):
    with open(movie_index_file) as index_file_object:
        for line in index_file_object:
            split_fields = movie_index_file.split("|")
            MOVIE_INDEX[split_fields[0]]=split_fields[1]

def parse_ratings_line(line):
    _,movie_id,rating,_=line.split(" ")
    return int(movie_id),(int(rating),1)

if __name__ == "__main__":
    conf = SparkConf().setAppName("sample-app")
    sc=SparkContext(conf)
    movie_rating_text_file=sc.textFile("hdfs:///movie_data/u.data")

    rating_data_dss =   movie_rating_text_file.map(parse_ratings_line)

    total_rating_data_dss   =   rating_data_dss.reduceByKey(lambda x,y: (x[0]+y[0],x[1]+y[1]  ))

    avg_rating_data     =       total_rating_data_dss.mapValues(lambda x:x[0]/x[1])

    sorted_by_avg_data   =   avg_rating_data.sortBy(lambda x:x[1])

    top_10 = sorted_by_avg_data.take(10)

    for result in top_10:
        print result







