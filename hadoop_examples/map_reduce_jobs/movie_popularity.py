from mrjob.job import MRJob
from mrjob.step import MRStep

class MoviePopularity(MRJob):
    def steps(self):
        return [
                    MRStep(mapper=self.mapper_for_movies,reducer=self.reducer_for_counts),
                    MRStep(reducer=self.reducer_for_sorts)
                ]

    def mapper_for_movies(self,_,line):
        _,movie_id,_,_=line.split("\t")
        yield movie_id,1

    def reducer_for_counts(self, key, values):
        yield str.zfill(str(sum(values)),5),key

    def reducer_for_sorts(self, count, movies):
        for movie in movies:
            yield movie, count

if __name__ == "__main__":
    MoviePopularity().run()