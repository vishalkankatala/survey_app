import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {
	popup_status:boolean =false;	

	@HostBinding('class.open') get popupstatus(){
		return this.popup_status;
	}

	@HostListener('click') open(){
		this.popup_status=true;		
	} 
	
	@HostListener('mouseleave') close(){
		this.popup_status=false;
	}
	
	constructor() { }

}
