import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.api.java.tuple.Tuple3;
import org.apache.flink.api.java.DataSet;
import org.apache.flink.api.java.ExecutionEnvironment;
import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.api.common.functions.GroupReduceFunction;

import org.apache.flink.util.Collector;

public class CrimeAnalysis{
	public static void main(String args[]) throws Exception{
		ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();
		DataSet<Tuple2<String,String>> recordsDataSet = env.readCsvFile("/Users/vishalkankatala/Desktop/SacramentocrimeJanuary2006.csv").includeFields("0000011").ignoreFirstLine().types(String.class,String.class);
		recordsDataSet.groupBy(0,1).reduceGroup(new CountCrimesReducer()).print();
	}	
} 

class CountCrimesReducer implements GroupReduceFunction<Tuple2<String,String>, Tuple3<String,String,Integer>> {
	@Override 
	public void reduce(Iterable<Tuple2<String,String>> inputs, Collector<Tuple3<String,String,Integer>> output){
		int count=0;
		String crimeDesc=null;
		String crimeCode=null;;
		for(Tuple2<String,String> record: inputs){
			crimeDesc = record.f0;
			crimeCode = record.f1;
			count++;	
		}
		if(crimeDesc != null && crimeCode != null){
			output.collect(new Tuple3<String,String,Integer>(crimeDesc, crimeCode,count));
		}
	}
}
