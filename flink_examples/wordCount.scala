package org.apache.flink.sreaming.examples.wordcount

import org.apache.flink.api.java.utils.ParameterTool
import org.apache.flink.streaming.api.scala._


object wordCount {
	def main(args: Array[String]){
		val params = ParameterTool.fromArgs(args)
		val env = StreamExecutionEnvironment.getExecutionEnvironment
		env.getConfig.setGlobalJobParameters(params)
		val text = 
		if(params.has("input")){
			env.readTextFile(params.get("input"))	
		}else{
			println("Please provide the input")	
		}
		
		val counts: DataStream[(String,Text)] = 
		text
			.flatMap(_.toLowerCase.split("\\W+"))
			.filter(_.nonEmpty)
			.map((_,1))
			.keyBy(0)
			.sum(1)
		if(params.has("output")){
			counts.writeAsText(params.get("output"))
		}else{
			counts.print()
		}		
		env.execute("Streaming WordCount")
	}
}
