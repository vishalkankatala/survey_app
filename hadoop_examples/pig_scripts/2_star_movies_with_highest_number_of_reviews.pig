ratings_data = LOAD '/movie_data/u.data' AS (userID: int, movieID: int, rating: int, ratingTime: int);

movie_data = LOAD '/movie_data/u.item' using PigStorage('|') AS (movieID: int, movieName: chararray, releaseDate: chararray, videoRelease: chararray, imdbLink: chararray);

pruned_movie_data = FOREACH movie_data GENERATE movieID, movieName;

group_rating_data = GROUP ratings_data BY movieID;

avg_rating_data = FOREACH group_rating_data GENERATE group AS movieID, AVG(rating_data.rating) AS avg_rating, COUNT(rating_data.userID) AS num_ratings;

filtered_rating_data = FILTER avg_rating_data BY avg_rating < 2.0;

joined_movie_rating_data = JOIN pruned_movie_data BY movieID, avg_rating_data BY movieID;

ordered_results = ORDER joined_movie_rating_data BY avg_rating_data::num_ratings;

DUMP ordered_results;
