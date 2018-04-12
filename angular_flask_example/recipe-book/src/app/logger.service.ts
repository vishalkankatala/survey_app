import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() {}
	
  logData(data:String){
		console.log(data);	
	}

}
