rating_data = LOAD '/user/maria_dev/ml-100k/u.data' AS (userID: int, movieID: int, rating: int, ratingTime: int );

movie_data = LOAD '/user/maria_dev/ml-100k/u.item' AS (movieID: int, movieName: chararray, releaseDate: chararray, videoRelease: chararray, imdbLink: chararray);

pruned_movie_data = FOREACH movie_data GENERATE movieID, movieName, ToUnixTime(ToDate(releaseDate,'dd-MMM-yyyy')) AS releaseDate;

grouped_rating_data = GROUP rating_data BY movieID;

avg_rating_data = FOREACH grouped_rating_data GENERATE group AS movieID, avg(rating) AS avgRating;

filtered_rating_data = FILTER avg_rating_data BY avgRating > 4.0;

joined_movie_data = JOIN filtered_rating_data by movieID, pruned_movie_data by movieID;

ordered_five_star_movies = ORDER joined_movie_data by joined_movie_data::releaseDate;

DUMP ordered_five_star_movies;




