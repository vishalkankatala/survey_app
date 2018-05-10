import backtype.storm.tuple.Fields;

import backtype.storm.topology.TopologyBuilder;
import backtype.storm.LocalCluster;
import backtype.storm.Config;

public class CallLogAnalyzerStorm{

	public static void main(String args[]) throws Exception{
		Config config = new Config();
		config.setDebug(true);		
		TopologyBuilder builder = new TopologyBuilder();	
		builder.setSpout("Call log generator",new FakeCallReporter());
		builder.setBolt("Call log creator", new CallLogCreatorBolt()).shuffleGrouping("Call log generator");
		builder.setBolt("Call log aggregator", new CallLogAggregator()).fieldsGrouping("Call log creator",new Fields("call"));
		LocalCluster cluster = new LocalCluster();
		cluster.submitTopology("Log analyzer topology",config,builder.createTopology());
		Thread.sleep(10000);
		cluster.shutdown();
	}
}
