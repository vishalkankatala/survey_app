import backtype.storm.topology.TopologyBuilder;
import backtype.storm.LocalCluster;
import backtype.storm.config;

public class CallLogAnalyzerStorm{

	public static void main(String args[]){
		Config config = new Config();
		config.setDebug(true);		

		TopologyBuilder builder = new TopologyBuilder();	
		builder.setSpout("Call log generator",new FakeCallReporter());
		builder.setBolt("Call log creator", new CallLogCreator()).shuffleGrouping("Call log generator");
		builder.setBolt("Call log aggregator", new CallLogAggregator()).fieldsGrouping("Call log creator");
		
		LocalCluster cluster = new LocalCluster();
		cluster.submitTopology("Log analyzer topology",config,builder.createTopology());
		Thread.sleep(10000);
	
		cluster.shutDown();
	}
}
