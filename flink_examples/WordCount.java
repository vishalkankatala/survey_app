import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.java.DataSet;
import org.apache.flink.api.java.ExecutionEnvironment;
import org.apache.flink.api.java.aggregation.Aggregations;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.core.fs.FileSystem.WriteMode;

import org.apache.flink.util.Collector;

public class WordCount{
	public static void main(String args[]) throws Exception {					
		ParameterTool params = ParameterTool.fromArgs(args);
		ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();
		env.getConfig().setGlobalJobParameters(params);
							
		DataSet<String> input_lines = env.readTextFile(params.get("input"));
		DataSet<Tuple2<String,Integer>> counts = 
				input_lines.flatMap(new Splitter())
				.groupBy(0)
				.aggregate(Aggregations.SUM,1);
				
		counts.writeAsText(params.get("output"), WriteMode.OVERWRITE);
		
		env.execute("Word Count Sample");
	}
}
		
class Splitter implements FlatMapFunction<String, Tuple2<String,Integer>>{
		
	@Override
	public void flatMap(String value, Collector<Tuple2<String,Integer>> out){
		String[] tokens = value.split("\\W+");
		for(String token: tokens){
			if(token.length() > 0){
				out.collect(new Tuple2<String,Integer>(token,1));	
			}
		}
	}		
}

