from strabase import Connection

c = Connection("127.0.0.1","8000")

ratings_table = c.table("ratings")

if (ratings.exists()):
	print("ratings table already exists, so dropping it")
	ratings.drop()

#Create a rating column family
ratings_table.create("rating")

batch_obj = ratings_table.batch()

#Read the ratings file
with open("u.data") as f:
	for line in f:
		user_id, movie_id, rating, timestamp = line.split("\t")
		batch_obj.insert(user_id, "rating": {movie_id: rating})
	
batch_obj.commit(finalize=true)

print("fetch results for user-1")
print ratings_table.fetch("1")

