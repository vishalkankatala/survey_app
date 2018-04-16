rating_data = LOAD '/movie_data/u.data' AS (userID: int, movieID: int, rating: int, ratingTime: int );

movie_data = LOAD '/movie_data/u.item' using PigStorage('|') AS (movieID: int, movieName: chararray, releaseDate: chararray, videoRelease: chararray, imdbLink: chararray);

pruned_movie_data = FOREACH movie_data GENERATE movieID, movieName, ToUnixTime(ToDate(releaseDate,'dd-MMM-yyyy')) AS releaseDate;

grouped_rating_data = GROUP rating_data BY movieID;

avg_rating_data = FOREACH grouped_rating_data GENERATE group AS movieID, AVG(rating_data.rating) AS avgRating;

filtered_rating_data = FILTER avg_rating_data BY avgRating > 4.0;

joined_movie_data = JOIN filtered_rating_data by movieID, pruned_movie_data by movieID;

ordered_five_star_movies = ORDER joined_movie_data by pruned_movie_data::releaseDate;

DUMP ordered_five_star_movies;



