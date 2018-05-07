import java.util.*;

import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Values;
import backtype.storm.tuple.Tuple;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;

import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;

public class CallLogAggregator implements IRichBolt{
	private OutputCollector collector;
	private TopologyContext context;
	private OutputCollector collector;
	private HashMap<String,Integer> counts = new HashMap<String,Integer>();	

	
	@Override
	public void prepare(Map<String> conf, TopologyContext context, OutputCollector collector){
		this.context=context;
		this.collector = collector;
	}
	
	@Override
	public void execute(Tuple tuple){
		String phoneCombination = tuple.get(0);
		if(counts.hasKey(phoneCombination)){
			counts.put(phoneCombination, counts.get(phoneCombination)+1);
		}else{
			counts.put(phoneCombination,1);
		}
		collector.ack(tuple);	
	} 

	@Override
	public void cleanUp(){
		for(MapEntrySet<String,Integer> entrySet:counts.entrySet()){
			System.out.println("Phone Number Combination: : "+entrySet.getKey()+" Count: "+entrySet.getValue());
		}
	}
	
	@Override
	public void declareOutputFields(OutputFieldDeclarator fieldDeclarator){
		fieldDeclarator.declare(new Fields("call"));
	}

	@Override
	public Map<String,object> getComponentConfiguration(){
		return null;
	}

}
