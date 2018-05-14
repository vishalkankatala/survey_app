import org.apache.flink.api.java.DataSet;
import org.apache.flink.api.java.ExecutionEnvironment;
import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.api.java.tuple.Tuple;
import org.apache.flink.util.Collector;


import java.util.*;

public class HighCrimeDistrict{
	public static void main(String args[]) throws Exception{
		ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();
		env.readTextFile("/Users/vishalkankatala/Desktop/SacramentocrimeJanuary2006.csv")
								
		.flatMap(new DistrictCounter()).groupBy(0).sum(1).print();
			
	}
	
}

	class DistrictCounter implements FlatMapFunction<String,Tuple2<String,Integer>>{
		
		@Override
		public void flatMap(String input, Collector<Tuple2<String,Integer>> out){
			if(!input.contains("district")){		
				String parsed_input = input.split(",")[2];
				out.collect(new Tuple2<String,Integer>(parsed_input,1));
			}
		}
	}
