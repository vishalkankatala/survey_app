import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-home',
  template: `
    <p>
      Welcome to the recipe book!
    </p>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
