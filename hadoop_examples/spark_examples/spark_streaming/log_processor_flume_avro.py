import re

from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.flume import FlumeUtils

regex=r'\S* - - \[.*\] \"(?P<request_method>\S*) (?P<request_url>\S*) (.*)'

def extract_request_url(url):
	compiled_regex=re.compile(regex)
	results = complied_regex.match(url)
	return results.groupdict()["request_url"]

if __name__ == "__main__":
	sc = SparkContext(appName="Flume streaming application")

	sc.setLogLevel("ERROR")

	streaming_context = StreamingContext(sc,1)

	flumeStream = FlumeUtils.createStream(streaming_context,"localhost",9092)

	request_url_rdds = flumeStream.map(lambda x:x[1]).map(extract_request_url)

	aggregated_counts = request_url_rdds.map(lambda x: x,1).reduceByKeyAndWindow(lambda x,y:x+y, lambda x,y:x-y, 300,100)

	sorted_results = aggregated_counts.transform(lambda rdd: rdd.sortBy(lambda x: x[1], False))

	sorted_results.pprint()

	streaming_context.checkpoint("/user/maria_dev/checkpoint")

	streaming_context.start()

	streaming_context.awaitTermination()
