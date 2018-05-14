import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.api.java.DataSet;
import org.apache.flink.api.java.ExecutionEnvironment;
import org.apache.flink.api.java.tuple.Tuple1;
import org.apache.flink.api.java.tuple.Tuple3;

public class CrimeHourSorted{
	public static void main(String args[]) throws Exception{
		ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();
		DataSet<Tuple3<String,String,Integer>> results = env.readCsvFile("/Users/vishalkankatala/Desktop/SacramentocrimeJanuary2006.csv")
			.includeFields("100000").ignoreFirstLine()
			.types(String.class)
			.map(new dateExtractor())
			.groupBy(0,1)
			.sum(2)
			.groupBy(0)
			.maxBy(0,2);
		results.print();		
	}
}

class dateExtractor implements MapFunction<Tuple1<String>, Tuple3<String,String,Integer>>{
	
	@Override
	public Tuple3<String,String,Integer> map(Tuple1<String> input ) throws Exception{
		SimpleDateFormat formatter1 = new SimpleDateFormat("MM/dd/yyyy HH:MM");
		SimpleDateFormat formatter2 = new SimpleDateFormat("MM/dd/yyyy HH");

		Date crimeDateTime = formatter1.parse(input.f0);
		String outputString = formatter2.format(crimeDateTime);
		String tokens[] = outputString.split(" ");
		return new Tuple3<String,String,Integer>(tokens[0],tokens[1],1);
	}
}
