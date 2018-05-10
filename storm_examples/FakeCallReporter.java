import java.util.*;

import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Values;

import backtype.storm.topology.IRichSpout;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.spout.SpoutOutputCollector;
import backtype.storm.task.TopologyContext;

public class FakeCallReporter implements IRichSpout {
	private SpoutOutputCollector collector;
	private boolean completed=false;
	private Random randomGenerator = new Random();
	private TopologyContext context;

	public void open(Map conf, TopologyContext context, SpoutOutputCollector collector){
		this.collector=collector;
		this.context=context;
	}

	public void nextTuple(){
		List<String> fromPhoneNumbers = new ArrayList<String>();
		List<String> toPhoneNumbers = new ArrayList<String>();
		fromPhoneNumbers.add("7032310212");
		fromPhoneNumbers.add("7037931901");
                fromPhoneNumbers.add("8168162123");
                fromPhoneNumbers.add("9192321111");
		toPhoneNumbers.add("1233217777");
		toPhoneNumbers.add("3454442345");
                toPhoneNumbers.add("9899999999");
                toPhoneNumbers.add("1233211234");
		
		for(int i=0;i<10;i++){
			for(int j=0;j<10;j++){
				String fromPhoneNumber = fromPhoneNumbers.get(randomGenerator.nextInt(4));
				String toPhoneNumber = toPhoneNumbers.get(randomGenerator.nextInt(4)); 
				this.collector.emit(new Values(fromPhoneNumber, toPhoneNumber, 1000));
			}
		}
	}
	
	public void declareOutputFields(OutputFieldsDeclarer declarer){
		declarer.declare(new Fields("from","to","duration"));
	}	
	
	   @Override
	   public void close() {}

	   public boolean isDistributed() {
	      return false;
	   }

	   @Override
	   public void activate() {}

	   @Override 
	   public void deactivate() {}

	   @Override
	   public void ack(Object msgId) {}

	   @Override
	   public void fail(Object msgId) {}

	   @Override
	   public Map<String, Object> getComponentConfiguration() {
	      return null;
   }

}

