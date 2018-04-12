import { Field } from "./field"

export class Survey {
	constructor(public name:string, public fields: Field[]){}
}
