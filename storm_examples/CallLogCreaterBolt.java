import java.utils.*;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.alues;

import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarator;
import backtype.storm.tuple.Tuple;

public class CallLogCreatorBolt implements IRichBolt {
	private OutputCollector collector;
	
	public void prepare(Map conf, TopologyContext context, OutputCollector outputCollector){
		this.outputCollector = outputCollector;
	}
	
	public void execute(Tuple tuple){
		String from_phone = tuple.getString(0);
		String to_phone = tuple.getString(1);
		Integer duration = tuple.getInteger(2);
		this.collector.emit(from_phone+"_"+to_phone,duration);		
	}
	
	@Override
	public void cleanup(){
	}
	
	@Override
	public void declareOutputFields(OutputFieldDeclarator declarator){
		declarator.declare(new Fields("phone_string","duration"));
	}
	
	@Override
	public Map<String,Object> getComponentConfiguration(){
		return null;
	}
	
	
}
