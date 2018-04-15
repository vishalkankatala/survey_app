from mrjob.job import MRJob
from mrjob.step import MRStep

"""
Rating record format:
    user_id movie_id rating timestamp
"""

class CategorizedRatingCount(MRJob):
    def steps(self):
        return [
            MRStep(
                mapper=self.mapper_get_ratings,
                reducer=self.reducer_get_rating_count
            )
        ]

    def mapper_get_ratings(self, _ , line):
        _, _, rating, _=line.split('\t')
        yield rating,1

    def reducer_get_rating_count(self, key, values):
        yield key,sum(values)

if __name__ == "__main__":
    CategorizedRatingCount().run()