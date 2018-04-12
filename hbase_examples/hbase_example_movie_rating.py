from starbase import Connection

c = Connection("40.71.210.227",8000)

user_ratings=c.table('user_ratings')

if(user_ratings.exists()):
	user_ratings.drop()

user_ratings.create("movie_rating")

user_ratings_batch=user_ratings.batch()

data_file=open("/Users/vishalkankatala/Downloads/ml-100k/u.data","r")

print "Loading the movie ratings into the database"

for line in data_file:
	(user_id,movie_id,rating,rating_time)=line.split("\t")
	user_ratings_batch.update(user_id,{"movie_rating":{movie_id:rating}})

data_file.close()

user_ratings_batch.commit(finalize=True)

print("Getting back info for some users")

print user_ratings.fetch("1")

print user_ratings.fetch("33")

